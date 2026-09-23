import Link from 'next/link';
import { readDb } from '@/lib/db';
import VastupurushaMandala from '@/components/VastupurushaMandala';
import StagesGrid from '@/components/StagesGrid';
import TempleCard from '@/components/TempleCard';
import BookingForm from '@/components/BookingForm';

export default function HomePage() {
  const db = readDb();
  // Grand Temple Spires, Gopurams, Vimanas, Sanctums & Monolithic Sculptures
  const targetIds = ['temple-17', 'temple-18', 'temple-14', 'temple-15', 'temple-16', 'temple-11', 'temple-12', 'temple-10', 'temple-13'];
  const featuredTemples = (db.temples || []).filter(t => targetIds.includes(t.id)).sort((a, b) => targetIds.indexOf(a.id) - targetIds.indexOf(b.id));

  return (
    <main>
      {/* Hero Section with Widescreen White Temple Background */}
      <section className="hero-section">
        <div className="hero-bg-media">
          <img src="/images/white_gopuram_widescreen.png" alt="Grand White Temple Architecture" />
        </div>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="eyebrow">Pan-India Turnkey Contract Specialist · 4 Generations</div>
          <p className="shloka">“प्रासादं यः प्रकुरुते विष्णोः शम्भोश्च मन्दिरे। स सर्वपापनिर्मुक्तः प्राप्नोति परमां गतिम्॥”</p>
          <h1 className="hero-title">
            A Dwelling for the Divine,<br />
            <span className="text-gold">Turnkey Temple Construction</span> Across All of India.
          </h1>
          <p className="hero-lead">
            Contract-based master builder constructing grand monolithic stone & RCC temples anywhere in Pan-India. Towering Dravidian Rajagopurams, Nagara curvilinear spires, and Vesara stellate temples — executed from foundation civil works to sacred Pratishtha.
          </p>
          <div className="hero-buttons">
            <Link href="/contractor" className="btn btn-gold">
              Explore Contractor Details & Scope →
            </Link>
            <Link href="/contact" className="btn btn-saffron">
              Fill Temple Construction Booking Form
            </Link>
            <a href="#consecrated-masterpieces" className="btn btn-outline-gold">
              View Temple Photos
            </a>
          </div>
        </div>
      </section>

      {/* At a Glance Stats Ribbon */}
      <div className="container">
        <div className="stats-ribbon">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-num">1,200+</div>
              <div className="stat-label">Temples Consecrated</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">Pan-India</div>
              <div className="stat-label">22 States Covered</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">4</div>
              <div className="stat-label">Generations of Sthapatis</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">350+</div>
              <div className="stat-label">Karigars & Artisans</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">Turnkey</div>
              <div className="stat-label">One Contract · No Handoffs</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: CONSECRATED TEMPLE MASTERWORKS SHOWCASE */}
      <section id="consecrated-masterpieces" className="section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">Consecrated Masterpieces</div>
            <h2 className="section-title">Grand Temple Spires & Gopurams Across India</h2>
            <p className="section-desc">
              From pure Makrana marble Dravidian towers to towering Bansi Paharpur sandstone Shikharas — executed by our master Sthapatis across India.
            </p>
          </div>

          <div className="temples-grid">
            {featuredTemples.map((temple) => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href="/projects" className="btn btn-gold" style={{ padding: '0.9rem 2.2rem' }}>
              🏛️ Explore All 18 Consecrated Temples & Construction Sites →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE VASTUPURUSHA MANDALA */}
      <VastupurushaMandala />

      {/* SECTION 4: SEVEN STAGES OF CRAFT */}
      <StagesGrid />

      {/* SECTION 5: BOOKING FORM */}
      <BookingForm />
    </main>
  );
}
