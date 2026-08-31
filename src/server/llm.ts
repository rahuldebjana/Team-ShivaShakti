type LlmMessage = { role: 'system' | 'user' | 'assistant'; content: string }

type ChatHistoryMessage = { role: 'user' | 'assistant'; content: string }

async function callOpenAiCompatibleApi(
  url: string,
  apiKey: string,
  model: string,
  messages: LlmMessage[],
): Promise<string> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 512,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    console.error('LLM API error:', response.status, errorBody)
    throw new Error('The assistant is temporarily unavailable. Please try again later or use the Contact page.')
  }

  const result = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }

  const reply = result.choices?.[0]?.message?.content?.trim()
  if (!reply) {
    throw new Error('No response received. Please try again.')
  }

  return reply
}

/** Groq — free tier, Llama 3.1 8B. Sign up at console.groq.com */
async function callGroq(messages: LlmMessage[]): Promise<string> {
  const apiKey = getGroqApiKey()
  if (!apiKey) return Promise.reject(new Error('GROQ_API_KEY not set'))

  return callOpenAiCompatibleApi(
    'https://api.groq.com/openai/v1/chat/completions',
    apiKey,
    'llama-3.1-8b-instant',
    messages,
  )
}

/**
 * Hugging Face Inference Providers — free monthly credits, open-source Llama.
 * Easier signup than Groq: huggingface.co → Settings → Access Tokens.
 */
async function callHuggingFace(messages: LlmMessage[]): Promise<string> {
  const apiKey = getHfToken()
  if (!apiKey) return Promise.reject(new Error('HF_TOKEN not set'))

  return callOpenAiCompatibleApi(
    'https://router.huggingface.co/v1/chat/completions',
    apiKey,
    'meta-llama/Llama-3.1-8B-Instruct:fastest',
    messages,
  )
}

export async function generateChatReply(
  systemPrompt: string,
  history: ChatHistoryMessage[],
  userMessage: string,
): Promise<string> {
  const messages: LlmMessage[] = [
    { role: 'system', content: systemPrompt },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage },
  ]

  const providers = [callGroq, callHuggingFace]
  const errors: string[] = []

  for (const provider of providers) {
    try {
      return await provider(messages)
    } catch (err) {
      errors.push(err instanceof Error ? err.message : 'unknown error')
    }
  }

  console.error('All LLM providers failed:', errors.join('; '))
  throw new Error(
    'The temple assistant is not configured yet. Please contact the temple directly via the Contact page.',
  )
}
