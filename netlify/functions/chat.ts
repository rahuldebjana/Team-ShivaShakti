import type { Handler } from '@netlify/functions'
import { TEMPLE_SYSTEM_PROMPT } from '../../src/data/temple-knowledge'
import { GROQ_API_KEY, HF_TOKEN } from './_secrets.mjs'

const MAX_MESSAGE_LENGTH = 500
const MAX_HISTORY_MESSAGES = 10
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'openai/gpt-oss-20b'
const HF_API_URL = 'https://router.huggingface.co/v1/chat/completions'
const HF_MODEL = 'meta-llama/Llama-3.1-8B-Instruct:fastest'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

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

async function callLlm(
  apiUrl: string,
  apiKey: string,
  model: string,
  messages: Array<{ role: string; content: string }>,
): Promise<string> {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, messages, max_tokens: 512, temperature: 0.7 }),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    console.error('LLM API error:', response.status, errorBody)
    throw new Error('The assistant is temporarily unavailable. Please try again later.')
  }

  const result = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> }
  const reply = result.choices?.[0]?.message?.content?.trim()
  if (!reply) throw new Error('No response received.')
  return reply
}

async function generateReply(message: string, history: ChatMessage[]): Promise<string> {
  const messages = [
    { role: 'system', content: TEMPLE_SYSTEM_PROMPT },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: message },
  ]

  const groqKey = GROQ_API_KEY || process.env.GROQ_API_KEY
  if (groqKey) {
    try {
      return await callLlm(GROQ_API_URL, groqKey, GROQ_MODEL, messages)
    } catch (err) {
      console.error('Groq failed:', err)
      throw err instanceof Error ? err : new Error('Groq request failed')
    }
  }

  const hfToken = HF_TOKEN || process.env.HF_TOKEN
  if (hfToken) {
    return callLlm(HF_API_URL, hfToken, HF_MODEL, messages)
  }

  throw new Error('The temple assistant is not configured yet.')
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' }, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {}
    const { message, history } = validateInput(body)
    const reply = await generateReply(message, history)
    return json(200, { reply })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Something went wrong.'
    const status = msg.includes('not configured') ? 503 : 400
    return json(status, { error: msg })
  }
}
