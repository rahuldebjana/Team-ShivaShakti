import { createServerFn } from '@tanstack/react-start'
import { TEMPLE_SYSTEM_PROMPT } from '@/data/temple-knowledge'
import { generateChatReply } from '@/server/llm'
import { getGroqApiKey, getHfToken } from '@/server/env'

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
    const hasGroq = Boolean(getGroqApiKey())
    const hasHf = Boolean(getHfToken())

    if (!hasGroq && !hasHf) {
      throw new Error(
        'The temple assistant is not configured yet. Please contact the temple directly via the Contact page.',
      )
    }

    const reply = await generateChatReply(TEMPLE_SYSTEM_PROMPT, data.history, data.message)
    return { reply }
  })
