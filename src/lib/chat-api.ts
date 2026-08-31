export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const CHAT_API = '/.netlify/functions/chat'

export async function sendChatRequest(message: string, history: ChatMessage[]): Promise<string> {
  const response = await fetch(CHAT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  })

  const data = (await response.json()) as { reply?: string; error?: string }

  if (!response.ok) {
    throw new Error(data.error ?? 'Something went wrong. Please try again.')
  }

  if (!data.reply) {
    throw new Error('No response received. Please try again.')
  }

  return data.reply
}
