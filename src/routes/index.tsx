import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="divider-om text-center my-8">
      <span style={{ color: '#D4A017', fontSize: '1.25rem' }}>🪷 {label} 🪷</span>
    </div>
  )
}

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center text-center py-32 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #8B0000 0%, #4A0E00 40%, #2D1B00 100%)',
          minHeight: '85vh',
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #D4A017 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #FF6B00 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div
            className="om-glow text-8xl mb-6 leading-none"
            style={{ color: '#D4A017', fontFamily: 'serif' }}
          >
            ॐ
          </div>
          <div
            className="text-lg mb-3 tracking-widest"
            style={{ color: '#F0C040', fontFamily: 'Georgia, serif', letterSpacing: '0.3em' }}
          >
            ওঁ নমঃ শিবায়
          </div>
          <h1
            className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
            style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif' }}
          >
            Beteswar Jhareswar
            <span style={{ color: '#F0C040' }}> Shiva </span>
            Mandir
          </h1>
          <p
            className="text-xl md:text-2xl mb-2"
            style={{ color: '#E8D5B0', fontFamily: 'Georgia, serif' }}
          >
            বেতেশ্বর ঝরেশ্বর শিব মন্দির
          </p>
          <p
            className="text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#C4A882' }}
          >
            A sacred sanctuary of devotion, peace, and community — where the divine presence of Lord Shiva guides every soul toward liberation and bliss.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/about"
              className="px-8 py-3 rounded text-base font-bold no-underline transition-all duration-200 hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #D4A017, #FF6B00)', color: '#fff', fontFamily: 'Georgia, serif' }}
            >
              Know Our Temple
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 rounded text-base font-bold no-underline transition-all duration-200"
              style={{
                border: '2px solid #D4A017',
                color: '#F0C040',
                fontFamily: 'Georgia, serif',
              }}
            >
              Visit Us
            </Link>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FFF8F0" />
          </svg>
        </div>
      </section>

      {/* Quick Info Banner */}
      <section className="py-10 px-6" style={{ background: '#FFF8F0' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: '🕐', label: 'Morning Darshan', value: '5:00 AM – 12:00 PM' },
              { icon: '🕕', label: 'Evening Darshan', value: '4:00 PM – 9:00 PM' },
              { icon: '📜', label: '80G Tax Benefit', value: 'Donations Eligible' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 rounded-xl text-center"
                style={{ background: '#fff', border: '1px solid #E8D5B0', boxShadow: '0 4px 20px rgba(139,0,0,0.08)' }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold mb-1" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>{item.label}</div>
                <div className="text-base" style={{ color: '#5C3D11' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionDivider label="Sacred Abode" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8">
            <div>
              <h2 className="text-4xl font-bold mb-5" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                A Temple of Faith & Tradition
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#5C3D11' }}>
                Beteswar Jhareswar Shiva Mandir stands as a beacon of spirituality and devotion. Founded with the blessings of Lord Shiva, this sacred temple has served countless devotees on their path to moksha and divine grace.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#5C3D11' }}>
                Our temple follows age-old Vedic traditions and rituals, performing daily aartis, special poojas, and festivals that bring the community together in worship and celebration.
              </p>
              <Link
                to="/about"
                className="inline-block px-6 py-2 rounded no-underline font-semibold text-sm transition-all"
                style={{ background: '#8B0000', color: '#F0C040', fontFamily: 'Georgia, serif' }}
              >
                Learn More →
              </Link>
            </div>

            {/* Decorative temple illustration */}
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(160deg, #8B0000 0%, #2D1B00 100%)',
                minHeight: 320,
                boxShadow: '0 20px 60px rgba(139,0,0,0.2)',
                border: '3px solid #D4A017',
              }}
            >
              <div className="text-center">
                <div className="text-8xl mb-4" style={{ color: '#D4A017' }}>🛕</div>
                <div className="text-2xl font-bold" style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}>
                  Beteswar Jhareswar Shiva Mandir
                </div>
                <div className="text-sm mt-2" style={{ color: '#C4A882' }}>Est. in devotion to Lord Shiva</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Key Offerings */}
      <section
        className="py-16 px-6"
        style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #F5E6D3 100%)' }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <SectionDivider label="Our Services" />
          <h2 className="text-3xl font-bold mb-2 mt-6" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            Divine Services & Rituals
          </h2>
          <p className="mb-12 text-base" style={{ color: '#5C3D11' }}>
            Conducted daily by our learned priests following Vedic traditions
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🪔', title: 'Daily Aarti', desc: 'Morning and evening aarti performed with devotion and sacred chants.' },
              { icon: '🌺', title: 'Rudrabhishek', desc: 'Sacred bathing of Shivalinga with milk, honey, curd, and water.' },
              { icon: '🥬', title: 'Maha Shivratri', desc: 'Grand celebration with all-night jagran, puja, and prasad distribution.' },
              { icon: '🔱', title: 'Satyanarayana Katha', desc: "Monthly narration of Lord Vishnu's glory and blessings." },
              { icon: '📿', title: 'Special Puja', desc: 'Griha pravesh, vivah, mundan, and all Samskaras performed on request.' },
              { icon: '🎶', title: 'Bhajans & Kirtans', desc: 'Weekly community bhajans and devotional singing sessions.' },
            ].map((s) => (
              <div
                key={s.title}
                className="p-6 rounded-xl text-left"
                style={{ background: '#fff', border: '1px solid #E8D5B0', boxShadow: '0 4px 20px rgba(139,0,0,0.08)' }}
              >
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C3D11' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 80G Callout */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background: 'linear-gradient(135deg, #8B0000, #4A0E00)',
              border: '3px solid #D4A017',
              boxShadow: '0 20px 60px rgba(139,0,0,0.3)',
            }}
          >
            <div className="text-5xl mb-4">📜</div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}>
              80G Tax Exemption Available
            </h2>
            <p className="text-base mb-6 leading-relaxed" style={{ color: '#E8D5B0' }}>
              All donations made to Beteswar Jhareswar Shiva Mandir are eligible for income tax deduction under Section 80G of the Income Tax Act, 1961. Your generosity supports the temple and provides you tax benefits.
            </p>
            <Link
              to="/tax-benefit"
              className="inline-block px-8 py-3 rounded font-bold no-underline text-sm transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #D4A017, #FF6B00)', color: '#fff', fontFamily: 'Georgia, serif' }}
            >
              Learn About 80G Benefits →
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 px-6" style={{ background: '#F5E6D3' }}>
        <div className="max-w-6xl mx-auto text-center">
          <SectionDivider label="Gallery" />
          <h2 className="text-3xl font-bold mb-10 mt-4" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            Glimpses of the Sacred
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { bg: 'linear-gradient(135deg, #8B0000, #D4A017)', label: 'Main Shivalinga', icon: '🔱' },
              { bg: 'linear-gradient(135deg, #4A0E00, #FF6B00)', label: 'Temple Entrance', icon: '🛕' },
              { bg: 'linear-gradient(135deg, #2D1B00, #D4A017)', label: 'Morning Aarti', icon: '🪔' },
              { bg: 'linear-gradient(135deg, #8B0000, #5C1A00)', label: 'Maha Shivratri', icon: '🌸' },
            ].map((item) => (
              <div
                key={item.label}
                className="gallery-img rounded-xl flex flex-col items-center justify-center cursor-pointer"
                style={{
                  background: item.bg,
                  aspectRatio: '1',
                  border: '2px solid #D4A017',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
              >
                <div className="text-5xl mb-3">{item.icon}</div>
                <div className="text-xs font-semibold" style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/gallery"
              className="inline-block px-7 py-3 rounded font-semibold no-underline text-sm"
              style={{ background: '#8B0000', color: '#F0C040', fontFamily: 'Georgia, serif' }}
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Quick Preview */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <SectionDivider label="Visit Us" />
          <h2 className="text-3xl font-bold mb-6 mt-4" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            Come, Seek Blessings of Lord Shiva
          </h2>
          <p className="mb-8 text-base" style={{ color: '#5C3D11' }}>
            Our temple welcomes all devotees. Come with faith, leave with peace.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 rounded font-bold no-underline text-sm transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #D4A017, #FF6B00)', color: '#fff', fontFamily: 'Georgia, serif' }}
          >
            Get Directions & Contact →
          </Link>
        </div>
      </section>
    </div>
  )
}
