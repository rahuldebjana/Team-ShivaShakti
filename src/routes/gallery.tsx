import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

const galleryItems = [
  { icon: '🔱', title: 'Shivalinga — Main Sanctum', category: 'Sanctum', bg: 'linear-gradient(135deg, #8B0000, #D4A017)', desc: 'The sacred Shivalinga enshrined in the main sanctum of Beteswar Jhaareswar Shiva Mandir.' },
  { icon: '🪔', title: 'Morning Aarti', category: 'Rituals', bg: 'linear-gradient(135deg, #4A0E00, #FF8C38)', desc: 'Daily morning aarti performed at sunrise with Vedic chants.' },
  { icon: '🛕', title: 'Temple Gopuram', category: 'Architecture', bg: 'linear-gradient(135deg, #2D1B00, #8B0000)', desc: 'The grand entrance gopuram adorned with divine sculptures.' },
  { icon: '🌸', title: 'Maha Shivratri', category: 'Festivals', bg: 'linear-gradient(135deg, #8B0000, #5C1A00)', desc: 'Grand celebration of Maha Shivratri with devotees from across the region.' },
  { icon: '🌺', title: 'Rudrabhishek', category: 'Rituals', bg: 'linear-gradient(135deg, #D4A017, #8B0000)', desc: 'Sacred Rudrabhishek performed with milk, honey, and Gangajal.' },
  { icon: '🎶', title: 'Bhajan Sandhya', category: 'Events', bg: 'linear-gradient(135deg, #FF6B00, #8B0000)', desc: 'Weekly bhajan and kirtan sessions bringing the community together.' },
  { icon: '🙏', title: 'Community Prasad', category: 'Service', bg: 'linear-gradient(135deg, #5C3D11, #D4A017)', desc: 'Mass prasad distribution to devotees during festivals and special occasions.' },
  { icon: '🏮', title: 'Diwali Celebrations', category: 'Festivals', bg: 'linear-gradient(135deg, #4A0E00, #D4A017)', desc: 'Temple beautifully lit during Diwali with thousands of diyas.' },
  { icon: '🌿', title: 'Temple Gardens', category: 'Architecture', bg: 'linear-gradient(135deg, #2D5016, #8B0000)', desc: 'Lush sacred gardens surrounding the temple premises.' },
  { icon: '📿', title: 'Special Puja', category: 'Rituals', bg: 'linear-gradient(135deg, #8B0000, #4A0E00)', desc: 'Personalized pujas conducted by our learned priests.' },
  { icon: '🎵', title: 'Navratri Garba', category: 'Festivals', bg: 'linear-gradient(135deg, #D4A017, #FF6B00)', desc: 'Colorful Navratri garba and dandiya celebrations.' },
  { icon: '⭐', title: 'Kartik Purnima', category: 'Festivals', bg: 'linear-gradient(135deg, #1A1A5C, #8B0000)', desc: 'Sacred lamp floating ceremony on Kartik Purnima evening.' },
]

const categories = ['All', 'Sanctum', 'Rituals', 'Festivals', 'Architecture', 'Events', 'Service']

function GalleryPage() {
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

      {/* Category badges */}
      <section className="py-8 px-6" style={{ background: '#FFF8F0', borderBottom: '1px solid #E8D5B0' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all"
              style={{ background: '#F5E6D3', color: '#8B0000', border: '1px solid #D4A017', fontFamily: 'Georgia, serif' }}
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-6" style={{ background: '#FFF8F0' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.title}
                className="gallery-img rounded-2xl overflow-hidden cursor-pointer group"
                style={{ boxShadow: '0 4px 20px rgba(139,0,0,0.12)', border: '2px solid #D4A017' }}
              >
                {/* Image placeholder */}
                <div
                  className="flex items-center justify-center"
                  style={{ background: item.bg, aspectRatio: '4/3' }}
                >
                  <div className="text-center">
                    <div className="text-7xl mb-3">{item.icon}</div>
                    <div
                      className="text-sm font-semibold px-4"
                      style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}
                    >
                      {item.title}
                    </div>
                  </div>
                </div>

                {/* Caption */}
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

      {/* Video / Virtual Tour callout */}
      <section className="py-12 px-6" style={{ background: '#F5E6D3' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            Virtual Darshan
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: '#5C3D11' }}>
            Unable to visit in person? Experience the divine presence of Beteswar Jhaareswar Shiva Mandir through our virtual darshan. Watch live aarti, puja streams, and temple celebrations from wherever you are.
          </p>
          <a
            href="https://beteswarshivamandir.netlify.app"
            className="inline-block px-8 py-3 rounded font-bold no-underline text-sm transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #D4A017, #FF6B00)', color: '#fff', fontFamily: 'Georgia, serif' }}
          >
            📺 Watch Live Aarti
          </a>
        </div>
      </section>

      {/* Donate for improvements */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base mb-4" style={{ color: '#5C3D11' }}>
            Want to share your photos from the temple? Send us your pictures and we'll feature them in our gallery.
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
