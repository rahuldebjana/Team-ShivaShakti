import { writeFileSync } from 'node:fs'

/** Embeds site env vars into the chat function bundle at build time. */
const groq = process.env.GROQ_API_KEY ?? ''
const hf = process.env.HF_TOKEN ?? ''

writeFileSync(
  'netlify/functions/_secrets.mjs',
  `// Auto-generated at build time — do not commit
export const GROQ_API_KEY = ${JSON.stringify(groq)}
export const HF_TOKEN = ${JSON.stringify(hf)}
`,
)

console.log(`Chat function secrets prepared (Groq: ${groq ? 'yes' : 'no'}, HF: ${hf ? 'yes' : 'no'})`)
