import { createServerFn } from '@tanstack/react-start'
import { TEMPLE_SYSTEM_PROMPT } from '@/data/temple-knowledge'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.1-8b-instant'

const MAX_MESSAGE_LENGTH = 500
const MAX_HISTORY_MESSAGES = 10

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type ChatInput = {
  message: string
  history: ChatMessage[]
}

function validateChatInput(data: unknown): ChatInput {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid request.')
  }

  const { message, history } = data as Record<string, unknown>

  if (typeof message !== 'string' || !message.trim()) {
    throw new Error('Please enter a message.')
  }

  const trimmed = message.trim()
  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`)
  }

  if (!Array.isArray(history)) {
    throw new Error('Invalid conversation history.')
  }

  const validHistory = history.slice(-MAX_HISTORY_MESSAGES).map((item) => {
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid conversation history.')
    }
    const { role, content } = item as Record<string, unknown>
    if (role !== 'user' && role !== 'assistant') {
      throw new Error('Invalid conversation history.')
    }
    if (typeof content !== 'string' || !content.trim()) {
      throw new Error('Invalid conversation history.')
    }
    if (content.length > MAX_MESSAGE_LENGTH) {
      throw new Error('Invalid conversation history.')
    }
    return { role, content: content.trim() } as ChatMessage
  })

  return { message: trimmed, history: validHistory }
}

export const sendChatMessage = createServerFn({ method: 'POST' })
  .validator(validateChatInput)
  .handler(async ({ data }) => {
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      throw new Error(
        'The temple assistant is not configured yet. Please contact the temple directly via the Contact page.',
      )
    }

    const messages = [
      { role: 'system' as const, content: TEMPLE_SYSTEM_PROMPT },
      ...data.history.map((m) => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: data.message },
    ]

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        max_tokens: 512,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '')
      console.error('Groq API error:', response.status, errorBody)
      throw new Error('The assistant is temporarily unavailable. Please try again later or use the Contact page.')
    }

    const result = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }

    const reply = result.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      throw new Error('No response received. Please try again.')
    }

    return { reply }
  })
