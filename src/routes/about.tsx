import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section
      className="py-20 px-6 text-center"
      style={{
        background: 'linear-gradient(160deg, #8B0000 0%, #4A0E00 50%, #2D1B00 100%)',
        borderBottom: '3px solid #D4A017',
      }}
    >
      <div className="text-4xl mb-3" style={{ color: '#D4A017' }}>ॐ</div>
      <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif' }}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg" style={{ color: '#C4A882', fontFamily: 'Georgia, serif' }}>
          {subtitle}
        </p>
      )}
    </section>
  )
}

function AboutPage() {
  return (
    <div>
      <PageHeader title="About the Temple" subtitle="বেতেশ্বর ঝরেশ্বর শিব মন্দিরের পরিচয়" />

      {/* Main About */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🛕</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
              Beteswar Jhareswar Shiva Mandir
            </h2>
            <div className="lotus-divider">🪷 ❋ 🪷</div>
          </div>

          <div className="space-y-6 text-base leading-relaxed" style={{ color: '#5C3D11' }}>
            <p>
              <strong style={{ color: '#8B0000' }}>Beteswar Jhareswar Shiva Mandir</strong> is a revered Hindu temple dedicated to Lord Shiva — the Supreme Being who is the destroyer of evil and the liberator of souls. Nestled in a serene and spiritually vibrant environment, this mandir has been a center of faith, culture, and community for countless devotees over the years.
            </p>
            <p>
              The temple enshrines a magnificent Shivalinga, the sacred symbol of Lord Shiva, around which all rituals and devotions are performed. The sacred atmosphere, the sound of temple bells, the fragrance of incense, and the chanting of Vedic mantras create an experience of profound peace and divine connection for all who visit.
            </p>
            <p>
              Governed by a dedicated trust, Beteswar Jhareswar Shiva Mandir remains committed to preserving ancient Vedic traditions while serving the spiritual and social needs of the community. The temple is registered as a charitable trust and is recognized under Section 80G of the Income Tax Act, 1961, enabling donors to claim tax exemptions on their generous contributions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6" style={{ background: '#F5E6D3' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div
              className="p-8 rounded-2xl"
              style={{ background: '#fff', border: '2px solid #D4A017', boxShadow: '0 8px 30px rgba(139,0,0,0.1)' }}
            >
              <div className="text-4xl mb-4">🔱</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                Our Mission
              </h3>
              <p className="leading-relaxed text-sm" style={{ color: '#5C3D11' }}>
                To create and maintain a sacred space where devotees can connect with the divine, perform rituals according to Vedic traditions, and find peace, guidance, and spiritual growth in their daily lives.
              </p>
            </div>

            <div
              className="p-8 rounded-2xl"
              style={{ background: '#fff', border: '2px solid #D4A017', boxShadow: '0 8px 30px rgba(139,0,0,0.1)' }}
            >
              <div className="text-4xl mb-4">🪷</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                Our Vision
              </h3>
              <p className="leading-relaxed text-sm" style={{ color: '#5C3D11' }}>
                To be a beacon of Sanatana Dharma — fostering unity, compassion, and devotion in the community, while promoting the rich cultural and spiritual heritage of our ancient civilization for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            Temple at a Glance
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: '80G', label: 'Tax Exemption', icon: '📜' },
              { value: '365', label: 'Days Open', icon: '📅' },
              { value: '2x', label: 'Daily Aarti', icon: '🪔' },
              { value: '∞', label: 'Divine Blessings', icon: '🙏' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl text-center"
                style={{ background: 'linear-gradient(160deg, #8B0000, #4A0E00)', border: '2px solid #D4A017' }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1" style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: '#C4A882' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs & Traditions */}
      <section className="py-16 px-6" style={{ background: '#F5E6D3' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            Our Traditions
          </h2>

          <div className="space-y-6">
            {[
              {
                title: 'Vedic Rituals',
                desc: 'All rituals performed at the temple strictly adhere to Vedic scriptures — from daily abhishek to seasonal festivals, each ceremony is conducted with utmost reverence and authenticity.',
              },
              {
                title: 'Panchkosh Sadhana',
                desc: 'The temple promotes holistic spiritual development through the five layers of existence: Annamaya, Pranamaya, Manomaya, Vijnanamaya, and Anandamaya Kosha.',
              },
              {
                title: 'Shivratri Celebration',
                desc: 'Maha Shivratri is the grandest festival at Beteswar Jhareswar Shiva Mandir, celebrated with 24-hour vigil, abhishek, bhajans, and mass community feast (prasad distribution).',
              },
              {
                title: 'Community Service (Seva)',
                desc: 'Beyond worship, the temple engages in social welfare — organizing health camps, educational support for underprivileged children, and food distribution during festivals.',
              },
            ].map((t) => (
              <div
                key={t.title}
                className="flex gap-4 p-6 rounded-xl"
                style={{ background: '#fff', border: '1px solid #E8D5B0' }}
              >
                <div className="text-2xl flex-shrink-0">🔱</div>
                <div>
                  <h4 className="font-bold text-lg mb-2" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                    {t.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C3D11' }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Info */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background: 'linear-gradient(135deg, #8B0000, #2D1B00)',
              border: '3px solid #D4A017',
            }}
          >
            <div className="text-5xl mb-4">🏛️</div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}>
              Registered Charitable Trust
            </h2>
            <p className="leading-relaxed" style={{ color: '#E8D5B0' }}>
              Beteswar Jhareswar Shiva Mandir operates as a registered charitable trust under applicable Indian laws. Donations to the temple are exempt from income tax under Section 80G of the Income Tax Act, 1961. We maintain complete transparency in all financial activities and welcome devotees to be a part of this sacred service.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
