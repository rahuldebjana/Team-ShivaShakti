import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

type GalleryItem = {
  title: string
  category: string
  desc: string
  image: string
  featured?: boolean
}

const galleryItems: GalleryItem[] = [
  {
    title: 'Mandir Under Construction',
    category: 'Construction',
    desc: 'A sacred milestone — the new Beteswar Jhaareswar Shiva Mandir rising at Beteswar, Damodarpur. Skilled artisans are shaping traditional brick-and-stone pillars, bamboo scaffolding, and the sanctum platform that will soon welcome devotees from across Purba Medinipur.',
    image: '/gallery/mandir-under-construction.jpg',
    featured: true,
  },
  {
    title: 'Shivalinga — Sacred Sanctum',
    category: 'Lord Shiva',
    desc: 'The holy Shivalinga adorned with marigold flowers and bilva leaves — the eternal symbol of Lord Shiva’s presence that will be enshrined in our mandir.',
    image: '/gallery/shiva-shivalinga.jpg',
  },
  {
    title: 'Lord Shiva — Nataraja',
    category: 'Lord Shiva',
    desc: 'Shiva as Nataraja, the Lord of Dance — cosmic creator and destroyer, whose divine rhythm sustains the universe. ॐ नमः शिवाय',
    image: '/gallery/shiva-nataraja.jpg',
  },
  {
    title: 'Shiva in Meditation',
    category: 'Lord Shiva',
    desc: 'Lord Shiva in deep meditation — the Adiyogi who bestows peace, wisdom, and liberation upon all who seek His blessings.',
    image: '/gallery/shiva-meditating.jpg',
  },
  {
    title: 'Rudrabhishek Puja',
    category: 'Lord Shiva',
    desc: 'Sacred Rudrabhishek — bathing the Shivalinga with milk, honey, and Gangajal while Vedic mantras are chanted by devoted priests.',
    image: '/gallery/shiva-rudrabhishek.jpg',
  },
]

const categories = ['All', 'Construction', 'Lord Shiva']

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  const featuredItem = galleryItems.find((item) => item.featured)

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
        <div className="text-4xl mb-3" style={{ color: '#D4A017' }}>ॐ</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif' }}>
          Temple Gallery
        </h1>
        <p className="text-lg" style={{ color: '#C4A882', fontFamily: 'Georgia, serif' }}>
          Glimpses of the Sacred — দিব্য দৃশ্য
        </p>
      </section>

      {/* Featured construction photo */}
      {featuredItem && (activeCategory === 'All' || activeCategory === 'Construction') && (
        <section className="py-12 px-6" style={{ background: '#F5E6D3' }}>
          <div className="max-w-5xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '3px solid #D4A017', boxShadow: '0 12px 40px rgba(139,0,0,0.18)' }}
            >
              <img
                src={featuredItem.image}
                alt={featuredItem.title}
                className="w-full object-cover"
                style={{ maxHeight: 520 }}
              />
              <div className="p-6 md:p-8" style={{ background: '#fff' }}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ background: '#8B0000', color: '#F0C040' }}
                  >
                    🏗️ {featuredItem.category}
                  </span>
                  <span className="text-xs" style={{ color: '#9A7A5A' }}>
                    Beteswar, Damodarpur, Purba Medinipur
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                  {featuredItem.title}
                </h2>
                <p className="text-base leading-relaxed" style={{ color: '#5C3D11' }}>
                  {featuredItem.desc}
                </p>
                <p className="text-sm mt-4 italic" style={{ color: '#8B0000' }}>
                  With your blessings and support, this mandir will soon stand as a centre of faith, seva, and community for all devotees. ॐ नमः शिवाय
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category badges */}
      <section className="py-8 px-6" style={{ background: '#FFF8F0', borderBottom: '1px solid #E8D5B0' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer"
              style={{
                background: activeCategory === cat ? '#8B0000' : '#F5E6D3',
                color: activeCategory === cat ? '#F0C040' : '#8B0000',
                border: '1px solid #D4A017',
                fontFamily: 'Georgia, serif',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-6" style={{ background: '#FFF8F0' }}>
        <div className="max-w-6xl mx-auto">
          {activeCategory !== 'Construction' && (
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
              {activeCategory === 'Lord Shiva' ? '🔱 Lord Shiva — দিব্য দর্শন' : '🔱 Gallery'}
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems
              .filter((item) => !item.featured || activeCategory === 'Lord Shiva')
              .map((item) => (
                <div
                  key={item.title}
                  className="gallery-img rounded-2xl overflow-hidden group"
                  style={{ boxShadow: '0 4px 20px rgba(139,0,0,0.12)', border: '2px solid #D4A017' }}
                >
                  <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4" style={{ background: '#fff' }}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-sm" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                        {item.title}
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: '#F5E6D3', color: '#5C3D11', border: '1px solid #E8D5B0' }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#5C3D11' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Support construction */}
      <section className="py-12 px-6" style={{ background: 'linear-gradient(135deg, #8B0000, #4A0E00)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">🛕</div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}>
            Help Build Our Mandir
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: '#E8D5B0' }}>
            The construction of Beteswar Jhaareswar Shiva Mandir is progressing with devotion and dedication. Your generous contribution helps complete the sanctum, gopuram, and facilities for devotees. Donations are eligible for 80G tax benefits.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 rounded font-bold no-underline text-sm transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #D4A017, #FF6B00)', color: '#fff', fontFamily: 'Georgia, serif' }}
          >
            🙏 Support the Temple →
          </a>
        </div>
      </section>

      {/* Submit photos */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base mb-4" style={{ color: '#5C3D11' }}>
            Have photos from the mandir construction or puja ceremonies? Share them with us and we will feature them in our gallery.
          </p>
          <a
            href="mailto:rahuldeb123jana@gmail.com"
            className="text-sm font-semibold no-underline"
            style={{ color: '#8B0000' }}
          >
            📷 Submit Your Photos →
          </a>
        </div>
      </section>
    </div>
  )
}
