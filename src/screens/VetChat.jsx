import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '../components/ui/input'
import EmptyState from '../components/EmptyState'
import { ageText } from '../lib/dates'
import { SPECIES_BY_ID } from '../data/species'
import { cn } from '../lib/utils'

const SUGGESTIONS = [
  'Why is my pet not eating?',
  'How often should I bathe my dog?',
  'My cat keeps scratching, what should I do?',
  'When should I start training my puppy?',
  'Is chocolate dangerous for pets?',
]

export default function VetChat({ navigate, petData, pets = [] }) {
  const { t } = useTranslation()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        petData
          ? `Hi! I'm Anaboo, your AI vet assistant 🐾 Got any questions about ${petData.name}? I'm here to help!`
          : "Hi! I'm Anaboo, your AI vet assistant 🐾 Ask me anything about pet care, nutrition, or behavior!",
    },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending])

  const pet = petData ?? pets[0]
  const sp = pet ? SPECIES_BY_ID[pet.species] : null

  const send = async (raw) => {
    const text = (raw ?? input).trim()
    if (!text || sending) return
    const userMsg = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setSending(true)

    try {
      const res = await fetch('/api/vet-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
          pet: pet
            ? {
                species: sp?.labelEn || pet.species,
                breed:   pet.breed,
                age:     ageText(pet.birthDate),
                weight:  pet.weight,
              }
            : undefined,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const reply = data.reply || data.error || "Sorry, I couldn't respond. Please try again."
      setMessages(m => [...m, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(m => [
        ...m,
        { role: 'assistant', content: "I'm having trouble connecting right now. Make sure the AI service is configured. Try again in a moment 🐾" },
      ])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[760px] bg-brand-cream overflow-hidden">
      {/* Header */}
      <div
        className="bg-white pt-5 px-5 pb-4 shadow-card flex items-center gap-3"
        style={{ borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
      >
        <button
          onClick={() => navigate('dashboard')}
          className="w-10 h-10 rounded-2xl bg-brand-peach flex items-center justify-center active:scale-95"
          aria-label="back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#333"><path d="M14.7 5.3a1 1 0 010 1.4L9.4 12l5.3 5.3a1 1 0 11-1.4 1.4l-6-6a1 1 0 010-1.4l6-6a1 1 0 011.4 0z"/></svg>
        </button>
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-dk flex items-center justify-center text-[22px] shadow-card">
          🩺
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-[18px] font-extrabold text-slate-700 leading-tight">Vet AI Assistant</p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-ping-soft" />
            <span className="text-[11px] font-semibold text-slate-500">Online · Powered by Claude</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-4 pt-4 pb-2 flex flex-col gap-3">
        {messages.map((m, i) => (
          <Bubble key={i} msg={m} />
        ))}
        {sending && (
          <Bubble msg={{ role: 'assistant', content: '...' }} typing />
        )}

        {/* Suggestion chips when conversation just started */}
        {messages.length === 1 && (
          <div className="mt-3">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2 px-1">Try asking</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[12px] font-semibold text-slate-700 bg-white border border-slate-200 rounded-full px-3 py-2 active:scale-95 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
        <Input
          type="text"
          placeholder="Ask Anaboo a question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          className="flex-1 rounded-2xl"
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || sending}
          className={cn(
            'w-11 h-11 rounded-2xl bg-brand-orange text-white flex items-center justify-center text-[18px] font-bold shadow-card active:scale-95 transition-all',
            (!input.trim() || sending) && 'opacity-50'
          )}
          aria-label="send"
        >
          ↑
        </button>
      </div>
    </div>
  )
}

function Bubble({ msg, typing }) {
  const isUser = msg.role === 'user'
  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-dk flex items-center justify-center mr-2 shrink-0 text-[14px] mt-auto">
          🩺
        </div>
      )}
      <div
        className={cn(
          'max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug',
          isUser
            ? 'bg-brand-orange text-white rounded-br-md'
            : 'bg-white text-slate-700 rounded-bl-md shadow-card'
        )}
      >
        {typing ? (
          <span className="flex gap-1 items-center">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </span>
        ) : (
          msg.content
        )}
      </div>
    </div>
  )
}
