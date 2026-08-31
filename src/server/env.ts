/** Read env vars at request time using dynamic keys (avoids build-time inlining). */
export function getEnv(name: string): string | undefined {
  const value = process.env[name]
  return value && value.length > 0 ? value : undefined
}

export function getGroqApiKey(): string | undefined {
  return getEnv('GROQ_API_KEY')
}

export function getHfToken(): string | undefined {
  return getEnv('HF_TOKEN')
}
