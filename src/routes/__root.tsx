import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { useState } from 'react'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Beteswar Jhaareswar Shiva Mandir — Sacred Temple' },
      { name: 'description', content: 'Beteswar Jhaareswar Shiva Mandir — A sacred place of worship, devotion, and community. Registered under 80G for tax benefits.' },
    ],
  }),
  shellComponent: RootDocument,
})

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/tax-benefit', label: '80G Tax Benefit' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      style={{
        background: 'linear-gradient(135deg, #8B0000 0%, #5C1A00 50%, #2D1B00 100%)',
        borderBottom: '3px solid #D4A017',
      }}
      className="sticky top-0 z-50 shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <span className="om-glow text-2xl" style={{ color: '#D4A017' }}>ॐ</span>
            <div>
              <div className="text-white font-bold text-sm leading-tight tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                Beteswar Jhaareswar Shiva Mandir
              </div>
              <div className="text-xs leading-tight" style={{ color: '#F0C040' }}>
                বেতেশ্বর ঝারেশ্বর শিব মন্দির
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded text-sm font-medium transition-all duration-200 no-underline"
                style={{ color: '#F5E6D3', fontFamily: 'Georgia, serif' }}
                activeProps={{ style: { color: '#F0C040', backgroundColor: 'rgba(212,160,23,0.15)' } }}
                activeOptions={{ exact: link.to === '/' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Donate CTA */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="px-5 py-2 rounded text-sm font-bold no-underline transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #D4A017, #FF6B00)',
                color: '#fff',
                fontFamily: 'Georgia, serif',
              }}
            >
              Donate
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded"
            style={{ color: '#F0C040' }}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 pt-2 border-t" style={{ borderColor: 'rgba(212,160,23,0.3)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm no-underline"
                style={{ color: '#F5E6D3', fontFamily: 'Georgia, serif' }}
                activeProps={{ style: { color: '#F0C040' } }}
                activeOptions={{ exact: link.to === '/' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block mx-4 mt-3 px-5 py-2 rounded text-sm font-bold text-center no-underline"
              style={{ background: 'linear-gradient(135deg, #D4A017, #FF6B00)', color: '#fff' }}
            >
              Donate
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #2D1B00, #5C1A00)',
        borderTop: '3px solid #D4A017',
      }}
      className="mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl" style={{ color: '#D4A017' }}>ॐ</span>
              <div>
                <div className="font-bold text-lg" style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}>
                  Beteswar Jhaareswar Shiva Mandir
                </div>
                <div className="text-xs" style={{ color: '#D4A017' }}>বেতেশ্বর ঝারেশ্বর শিব মন্দির</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#C4A882' }}>
              A sacred place of worship, devotion, and community service dedicated to Lord Shiva.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-base" style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}>Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm no-underline hover:opacity-80 transition-opacity"
                    style={{ color: '#C4A882' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-base" style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}>Temple Hours</h4>
            <div className="space-y-2 text-sm" style={{ color: '#C4A882' }}>
              <div className="flex justify-between">
                <span>Morning Aarti</span>
                <span style={{ color: '#D4A017' }}>5:00 AM – 12:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Evening Aarti</span>
                <span style={{ color: '#D4A017' }}>4:00 PM – 9:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Special Puja</span>
                <span style={{ color: '#D4A017' }}>By Appointment</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 text-center text-xs"
          style={{ borderTop: '1px solid rgba(212,160,23,0.3)', color: '#9A7A5A' }}
        >
          <div className="mb-1" style={{ color: '#D4A017', letterSpacing: '0.5rem' }}>🪷 ❋ 🪷</div>
          © {new Date().getFullYear()} Beteswar Jhaareswar Shiva Mandir. All rights reserved. &nbsp;|&nbsp; Registered under 80G
        </div>
      </div>
    </footer>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body style={{ background: '#FFF8F0' }}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
