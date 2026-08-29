import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { templeDirectionsUrl, templeLocation, templeMapEmbedUrl, templeMapsUrl } from '@/data/location'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

const SUBJECT_OPTIONS = [
  { value: 'General Enquiry', label: 'General Enquiry' },
  { value: 'Donation / 80G', label: 'Donation / 80G Enquiry' },
  { value: 'Puja Booking', label: 'Puja / Ceremony Booking' },
  { value: 'Event', label: 'Upcoming Events' },
  { value: 'Feedback', label: 'Feedback / Suggestions' },
  { value: 'Other', label: 'Other' },
] as const

const SUBJECT_VALUES = SUBJECT_OPTIONS.map((option) => option.value)

const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 20,
  subject: 50,
  message: 2000,
} as const

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
}

function validateFields(fields: { name: string; email: string; phone: string; subject: string; message: string }): string | null {
  if (!fields.name.trim()) return 'Please enter your name.'
  if (fields.name.length > FIELD_LIMITS.name) return `Name must be ${FIELD_LIMITS.name} characters or fewer.`
  if (!fields.email.trim()) return 'Please enter your email address.'
  if (fields.email.length > FIELD_LIMITS.email) return `Email must be ${FIELD_LIMITS.email} characters or fewer.`
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return 'Please enter a valid email address.'
  if (fields.phone.length > FIELD_LIMITS.phone) return `Phone must be ${FIELD_LIMITS.phone} characters or fewer.`
  if (!fields.subject) return 'Please select a subject.'
  if (!SUBJECT_VALUES.includes(fields.subject as (typeof SUBJECT_VALUES)[number])) return 'Please select a valid subject.'
  if (!fields.message.trim()) return 'Please enter a message.'
  if (fields.message.length > FIELD_LIMITS.message) return `Message must be ${FIELD_LIMITS.message} characters or fewer.`
  return null
}

function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const validationError = validateFields(fields)
    if (validationError) {
      setError(validationError)
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', 'bot-field': '', ...fields }),
      })
      if (!response.ok) {
        throw new Error('Form submission failed')
      }
      setSubmitted(true)
    } catch {
      setError('Sorry, we could not send your message. Please try again or email us directly at rahuldeb123jana@gmail.com.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🙏</div>
        <h3 className="text-2xl font-bold mb-3" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
          Pranam! Your message has been received.
        </h3>
        <p className="text-base" style={{ color: '#5C3D11' }}>
          Thank you for reaching out to Beteswar Jhaareswar Shiva Mandir. Our team will respond within 24–48 hours. May Lord Shiva bless you abundantly.
        </p>
        <div className="mt-6" style={{ color: '#D4A017', fontSize: '2rem', letterSpacing: '0.5rem' }}>ওঁ নমঃ শিবায়</div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" name="contact">
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden" aria-hidden="true">
        <label>
          Don&apos;t fill this out if you&apos;re human:
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {error && (
        <p className="text-sm rounded-lg px-4 py-3" style={{ background: '#FFF0F0', color: '#8B0000', border: '1px solid #E8A0A0' }} role="alert">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: '#5C3D11', fontFamily: 'Georgia, serif' }}>
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
            required
            maxLength={FIELD_LIMITS.name}
            placeholder="Your full name"
            className="temple-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: '#5C3D11', fontFamily: 'Georgia, serif' }}>
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            required
            maxLength={FIELD_LIMITS.email}
            placeholder="your@email.com"
            className="temple-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: '#5C3D11', fontFamily: 'Georgia, serif' }}>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={fields.phone}
            onChange={handleChange}
            maxLength={FIELD_LIMITS.phone}
            placeholder="+91 XXXXX XXXXX"
            className="temple-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: '#5C3D11', fontFamily: 'Georgia, serif' }}>
            Subject *
          </label>
          <select
            name="subject"
            value={fields.subject}
            onChange={handleChange}
            required
            className="temple-input"
          >
            <option value="">Select a subject</option>
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" style={{ color: '#5C3D11', fontFamily: 'Georgia, serif' }}>
          Message *
        </label>
        <textarea
          name="message"
          value={fields.message}
          onChange={handleChange}
          required
          maxLength={FIELD_LIMITS.message}
          rows={5}
          placeholder="Write your message here..."
          className="temple-input resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 rounded font-bold text-base transition-all hover:opacity-90 disabled:opacity-60"
        style={{
          background: 'linear-gradient(135deg, #8B0000, #D4A017)',
          color: '#fff',
          fontFamily: 'Georgia, serif',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? '🙏 Sending...' : '🙏 Send Message'}
      </button>
    </form>
  )
}

function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section
        className="py-20 px-6 text-center"
        style={{
          background: 'linear-gradient(160deg, #8B0000 0%, #4A0E00 50%, #2D1B00 100%)',
          borderBottom: '3px solid #D4A017',
        }}
      >
        <div className="text-4xl mb-3" style={{ color: '#D4A017' }}>🙏</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif' }}>
          Contact & Address
        </h1>
        <p className="text-lg" style={{ color: '#C4A882', fontFamily: 'Georgia, serif' }}>
          We welcome all devotees — come, seek blessings
        </p>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Info & Address */}
            <div>
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                Visit the Temple
              </h2>

              {/* Address Card */}
              <div
                className="p-8 rounded-2xl mb-6"
                style={{ background: 'linear-gradient(135deg, #8B0000, #4A0E00)', border: '2px solid #D4A017' }}
              >
                <div className="text-3xl mb-4">📍</div>
                <h3 className="font-bold text-xl mb-3" style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}>
                  Temple Address
                </h3>
                <address className="not-italic text-base leading-relaxed" style={{ color: '#E8D5B0' }}>
                  Beteswar Jhaareswar Shiva Mandir<br />
                  Balakbar - Beteswar Rd, Sadi<br />
                  Ramnagar, Purba Medinipur<br />
                  PIN — 721446<br />
                  India
                </address>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {[
                  { icon: '📞', label: 'Phone', value: '+91 XXXXX XXXXX', href: 'tel:+91XXXXXXXXXX' },
                  { icon: '📧', label: 'Email', value: 'rahuldeb123jana@gmail.com', href: 'mailto:rahuldeb123jana@gmail.com' },
                  { icon: '🌐', label: 'Website', value: 'beteswarshivamandir.netlify.app', href: '#' },
                ].map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center gap-4 p-4 rounded-xl no-underline transition-all hover:opacity-80"
                    style={{ background: '#fff', border: '1px solid #E8D5B0', boxShadow: '0 2px 10px rgba(139,0,0,0.06)' }}
                  >
                    <span className="text-2xl">{contact.icon}</span>
                    <div>
                      <div className="text-xs font-semibold mb-0.5" style={{ color: '#8B0000' }}>{contact.label}</div>
                      <div className="text-sm" style={{ color: '#5C3D11' }}>{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Temple Hours */}
              <div
                className="mt-6 p-6 rounded-2xl"
                style={{ background: '#F5E6D3', border: '1px solid #E8D5B0' }}
              >
                <h3 className="font-bold text-lg mb-4" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                  🕐 Temple Hours
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    { time: 'Morning Darshan', hours: '5:00 AM – 12:00 PM' },
                    { time: 'Afternoon Break', hours: '12:00 PM – 4:00 PM' },
                    { time: 'Evening Darshan', hours: '4:00 PM – 9:00 PM' },
                    { time: 'Special Puja', hours: 'By Prior Appointment' },
                  ].map((h) => (
                    <div key={h.time} className="flex justify-between items-center">
                      <span style={{ color: '#5C3D11' }}>{h.time}</span>
                      <span className="font-semibold" style={{ color: '#8B0000' }}>{h.hours}</span>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-4 pt-4 text-xs"
                  style={{ borderTop: '1px solid #D4A017', color: '#9A7A5A' }}
                >
                  * Temple is open all 365 days including holidays and festivals.
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                Send a Message
              </h2>
              <div
                className="p-8 rounded-2xl"
                style={{ background: '#fff', border: '2px solid #E8D5B0', boxShadow: '0 8px 30px rgba(139,0,0,0.1)' }}
              >
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            📍 Find Us on the Map
          </h2>
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{ border: '2px solid #D4A017', boxShadow: '0 8px 30px rgba(139,0,0,0.1)' }}
          >
            <iframe
              title="Beteswar Jhaareswar Shiva Mandir location map"
              src={templeMapEmbedUrl}
              className="w-full border-0"
              style={{ height: 360 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-6 text-center" style={{ background: 'linear-gradient(135deg, #F5E6D3, #E8D5B0)' }}>
              <p className="text-base font-semibold mb-1" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                {templeLocation.label}
              </p>
              <p className="text-sm mb-2" style={{ color: '#5C3D11' }}>
                {templeLocation.address}
              </p>
              <p className="text-sm font-medium mb-4" style={{ color: '#8B0000' }}>
                Google Plus Code: {templeLocation.plusCode}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={templeMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 rounded text-sm font-semibold no-underline"
                  style={{ background: '#8B0000', color: '#F0C040', fontFamily: 'Georgia, serif' }}
                >
                  Open in Google Maps →
                </a>
                <a
                  href={templeDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 rounded text-sm font-semibold no-underline"
                  style={{ background: '#fff', color: '#8B0000', border: '1px solid #D4A017', fontFamily: 'Georgia, serif' }}
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 px-6" style={{ background: '#F5E6D3' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            Connect With Us
          </h2>
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { icon: '📘', name: 'Facebook', color: '#1877F2' },
              { icon: '📸', name: 'Instagram', color: '#E1306C' },
              { icon: '🎬', name: 'YouTube', color: '#FF0000' },
              { icon: '🐦', name: 'Twitter/X', color: '#1DA1F2' },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className="flex items-center gap-3 px-6 py-3 rounded-xl no-underline font-semibold text-sm transition-all hover:opacity-80"
                style={{ background: '#fff', border: '1px solid #E8D5B0', color: '#5C3D11' }}
              >
                <span className="text-xl">{social.icon}</span>
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
