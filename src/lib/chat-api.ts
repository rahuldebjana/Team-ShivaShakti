export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  toolsUsed?: string[]
}

export type AgentChatResponse = {
  reply: string
  toolsUsed: string[]
  toolLabels: string[]
}

const CHAT_API = '/.netlify/functions/chat'

export async function sendAgentChatRequest(
  message: string,
  history: ChatMessage[],
): Promise<AgentChatResponse> {
  const response = await fetch(CHAT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      history: history.map(({ role, content }) => ({ role, content })),
    }),
  })

  const data = (await response.json()) as AgentChatResponse & { error?: string }

  if (!response.ok) {
    throw new Error(data.error ?? 'Something went wrong. Please try again.')
  }

  if (!data.reply) {
    throw new Error('No response received. Please try again.')
  }

  return {
    reply: data.reply,
    toolsUsed: data.toolsUsed ?? [],
    toolLabels: data.toolLabels ?? [],
  }
}
