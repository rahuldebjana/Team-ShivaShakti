import { useEffect, useRef, useState } from 'react'
import { sendChatRequest, type ChatMessage } from '@/lib/chat-api'

const SUGGESTED_QUESTIONS = [
  'What are the temple timings?',
  'How can I get 80G tax benefit?',
  'How do I book a special puja?',
  'Where is the temple located?',
]

function MessageBubble({ role, content }: ChatMessage) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
        style={
          isUser
            ? {
                background: 'linear-gradient(135deg, #D4A017, #FF6B00)',
                color: '#fff',
                borderBottomRightRadius: 4,
              }
            : {
                background: '#fff',
                color: '#5C3D11',
                border: '1px solid #E8D5B0',
                borderBottomLeftRadius: 4,
              }
        }
      >
        {!isUser && (
          <div className="text-xs font-semibold mb-1" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            Temple Assistant
          </div>
        )}
        {content}
      </div>
    </div>
  )
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [open, messages, loading])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    setError('')
    setInput('')
    const userMessage: ChatMessage = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const reply = await sendChatRequest(trimmed, messages)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void sendMessage(input)
    }
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="chatbot-panel fixed bottom-24 right-4 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            width: 'min(380px, calc(100vw - 2rem))',
            height: 'min(520px, calc(100vh - 8rem))',
            border: '2px solid #D4A017',
            background: '#FFF8F0',
          }}
          role="dialog"
          aria-label="Temple assistant chat"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{
              background: 'linear-gradient(135deg, #8B0000 0%, #5C1A00 50%, #2D1B00 100%)',
              borderBottom: '2px solid #D4A017',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl" style={{ color: '#D4A017' }}>ॐ</span>
              <div>
                <div className="text-sm font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  Temple Assistant
                </div>
                <div className="text-xs" style={{ color: '#F0C040' }}>
                  Ask about darshan, puja & 80G
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded hover:bg-white/10 transition-colors"
              style={{ color: '#F0C040' }}
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">🙏</div>
                <p className="text-sm mb-4" style={{ color: '#5C3D11' }}>
                  Namaste! I can help with temple timings, rituals, donations, 80G benefits, and directions.
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void sendMessage(q)}
                      className="text-left text-xs px-3 py-2 rounded-lg transition-colors hover:opacity-90"
                      style={{
                        background: '#fff',
                        border: '1px solid #E8D5B0',
                        color: '#8B0000',
                        fontFamily: 'Georgia, serif',
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <MessageBubble key={i} role={msg.role} content={msg.content} />
            ))}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl px-4 py-3 text-sm"
                  style={{ background: '#fff', border: '1px solid #E8D5B0', color: '#5C3D11' }}
                >
                  <span className="chatbot-typing">Thinking</span>
                  <span className="chatbot-dots">...</span>
                </div>
              </div>
            )}

            {error && (
              <div
                className="text-xs px-3 py-2 rounded-lg"
                style={{ background: '#FEE2E2', color: '#991B1B', border: '1px solid #FECACA' }}
                role="alert"
              >
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 px-3 py-3 flex gap-2 items-end"
            style={{ borderTop: '1px solid #E8D5B0', background: '#F5E6D3' }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the temple..."
              rows={1}
              maxLength={500}
              disabled={loading}
              className="temple-input flex-1 resize-none text-sm py-2"
              aria-label="Your message"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="shrink-0 p-2.5 rounded-lg transition-opacity disabled:opacity-40"
              style={{
                background: 'linear-gradient(135deg, #D4A017, #FF6B00)',
                color: '#fff',
              }}
              aria-label="Send message"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="chatbot-fab fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-xl transition-transform hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, #8B0000, #4A0E00)',
          border: '2px solid #D4A017',
          color: '#F0C040',
          fontFamily: 'Georgia, serif',
        }}
        aria-label={open ? 'Close temple assistant' : 'Open temple assistant'}
        aria-expanded={open}
      >
        <span className="text-lg">{open ? '✕' : 'ॐ'}</span>
        {!open && <span className="text-sm font-semibold hidden sm:inline">Ask Us</span>}
      </button>
    </>
  )
}
