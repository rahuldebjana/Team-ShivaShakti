import type { Handler } from '@netlify/functions'
import { AGENT_SYSTEM_PROMPT } from '../../src/agent/prompt'
import { AGENT_TOOLS, executeAgentTool, TOOL_LABELS } from '../../src/agent/tools'
import { GROQ_API_KEY, HF_TOKEN } from './_secrets.mjs'

const MAX_MESSAGE_LENGTH = 500
const MAX_HISTORY_MESSAGES = 10
const MAX_TOOL_ROUNDS = 4
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'openai/gpt-oss-20b'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

type LlmMessage = {
  role: string
  content?: string | null
  tool_calls?: Array<{
    id: string
    type: 'function'
    function: { name: string; arguments: string }
  }>
  tool_call_id?: string
}

type AgentResult = {
  reply: string
  toolsUsed: string[]
}

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  }
}

function validateInput(data: unknown): { message: string; history: ChatMessage[] } {
  if (!data || typeof data !== 'object') throw new Error('Invalid request.')

  const { message, history } = data as Record<string, unknown>
  if (typeof message !== 'string' || !message.trim()) throw new Error('Please enter a message.')

  const trimmed = message.trim()
  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`)
  }

  if (!Array.isArray(history)) throw new Error('Invalid conversation history.')

  const validHistory = history.slice(-MAX_HISTORY_MESSAGES).map((item) => {
    if (!item || typeof item !== 'object') throw new Error('Invalid conversation history.')
    const { role, content } = item as Record<string, unknown>
    if (role !== 'user' && role !== 'assistant') throw new Error('Invalid conversation history.')
    if (typeof content !== 'string' || !content.trim()) throw new Error('Invalid conversation history.')
    return { role, content: content.trim() } as ChatMessage
  })

  return { message: trimmed, history: validHistory }
}

function getApiKey(): string {
  const groqKey = GROQ_API_KEY || process.env.GROQ_API_KEY
  if (groqKey) return groqKey
  const hfToken = HF_TOKEN || process.env.HF_TOKEN
  if (hfToken) throw new Error('Agent tools require Groq. Please configure GROQ_API_KEY.')
  throw new Error('The temple assistant is not configured yet.')
}

async function callAgentLlm(messages: LlmMessage[]): Promise<LlmMessage> {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      tools: AGENT_TOOLS,
      tool_choice: 'auto',
      max_tokens: 600,
      temperature: 0.5,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    console.error('Agent LLM error:', response.status, errorBody)
    throw new Error('The assistant is temporarily unavailable. Please try again later.')
  }

  const result = (await response.json()) as { choices?: Array<{ message?: LlmMessage }> }
  const message = result.choices?.[0]?.message
  if (!message) throw new Error('No response received.')
  return message
}

async function runAgent(message: string, history: ChatMessage[]): Promise<AgentResult> {
  const messages: LlmMessage[] = [
    { role: 'system', content: AGENT_SYSTEM_PROMPT },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: message },
  ]

  const toolsUsed: string[] = []

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const assistantMessage = await callAgentLlm(messages)

    if (assistantMessage.tool_calls?.length) {
      messages.push(assistantMessage)

      for (const toolCall of assistantMessage.tool_calls) {
        const toolName = toolCall.function.name
        toolsUsed.push(toolName)

        let args: Record<string, unknown> = {}
        try {
          args = JSON.parse(toolCall.function.arguments || '{}') as Record<string, unknown>
        } catch {
          args = {}
        }

        const result = executeAgentTool(toolName, args)
        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: result,
        })
      }

      continue
    }

    const reply = assistantMessage.content?.trim()
    if (!reply) throw new Error('No response received.')

    return { reply, toolsUsed: [...new Set(toolsUsed)] }
  }

  const finalMessage = await callAgentLlm([
    ...messages,
    {
      role: 'user',
      content: 'Please provide your final answer to the devotee based on the tool results above.',
    },
  ])

  const reply = finalMessage.content?.trim()
  if (!reply) throw new Error('No response received.')

  return { reply, toolsUsed: [...new Set(toolsUsed)] }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' },
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {}
    const { message, history } = validateInput(body)
    const { reply, toolsUsed } = await runAgent(message, history)

    return json(200, {
      reply,
      toolsUsed,
      toolLabels: toolsUsed.map((t) => TOOL_LABELS[t] ?? t),
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Something went wrong.'
    const status = msg.includes('not configured') ? 503 : 400
    return json(status, { error: msg })
  }
}
