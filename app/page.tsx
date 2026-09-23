import Link from 'next/link';
import { readDb } from '@/lib/db';
import VastupurushaMandala from '@/components/VastupurushaMandala';
import StagesGrid from '@/components/StagesGrid';
import TempleCard from '@/components/TempleCard';
import BookingForm from '@/components/BookingForm';

export default function HomePage() {
  const db = readDb();
  const featuredTemples = (db.temples || []).slice(0, 3);

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
              📸 View Temple Photos
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
              🏛️ Explore All 13 Consecrated Temples & Construction Sites →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: CANONICAL TRADITIONS */}
      <section className="section" style={{ background: 'var(--bg-paper)', borderTop: '1px solid var(--border-stone)' }}>
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">Three Classical Orders</div>
            <h2 className="section-title">Rooted in Shilpa Shastra & Agama</h2>
            <p className="section-desc">
              Every curve, mould, finial, and corbel is bound by mathematical sutras passed through generational treatises.
            </p>
          </div>

          <div className="traditions-grid">
            {/* Dravida Card */}
            <div className="tradition-card">
              <div className="tradition-img-wrap">
                <img src="/images/white_gopuram_hero.png" alt="Dravida Temple Rajagopuram Architecture" />
                <span className="tradition-tag">Dravida Order</span>
              </div>
              <div className="tradition-body">
                <div className="tradition-name-row">
                  <h3>Dravida Vimana</h3>
                  <span className="sanskrit-name">द्राविड़ विमान</span>
                </div>
                <div className="tradition-meta">Stepped Pyramidal Superstructure</div>
                <p className="tradition-desc">
                  Characterized by soaring Rajagopurams, pillared Sabha Mandapas, monolithic stone corridors, and multi-tiered Tala floors capped by octagonal Shikharas.
                </p>
                <ul className="tradition-specs">
                  <li><span>Canonical Treatise:</span> <span>Mayamata & Manasara</span></li>
                  <li><span>Primary Stone:</span> <span>Monolithic Granite / Makrana</span></li>
                  <li><span>Core Regions:</span> <span>Tamil Nadu, Karnataka, Andhra</span></li>
                </ul>
              </div>
            </div>

            {/* Nagara Card */}
            <div className="tradition-card">
              <div className="tradition-img-wrap">
                <img src="/images/somnath_grand.png" alt="Nagara Temple Architecture" />
                <span className="tradition-tag">Nagara Order</span>
              </div>
              <div className="tradition-body">
                <div className="tradition-name-row">
                  <h3>Nagara Shikhara</h3>
                  <span className="sanskrit-name">नागर शिखर</span>
                </div>
                <div className="tradition-meta">Curvilinear Mountain Spire</div>
                <p className="tradition-desc">
                  Defined by soaring curvilinear Latina and Sekhari spires, square sanctum plans with cruciform projections (Rathas), and monumental Kalasha finials.
                </p>
                <ul className="tradition-specs">
                  <li><span>Canonical Treatise:</span> <span>Shilpa Ratnakara & Samarangana</span></li>
                  <li><span>Primary Stone:</span> <span>Bansi Paharpur & Jaisalmer</span></li>
                  <li><span>Core Regions:</span> <span>Gujarat, Rajasthan, MP, UP</span></li>
                </ul>
              </div>
            </div>

            {/* Vesara Card */}
            <div className="tradition-card">
              <div className="tradition-img-wrap">
                <img src="/images/vesara_grand.png" alt="Vesara Temple Architecture" />
                <span className="tradition-tag">Vesara Order</span>
              </div>
              <div className="tradition-body">
                <div className="tradition-name-row">
                  <h3>Vesara Stellate</h3>
                  <span className="sanskrit-name">वेसर शैली</span>
                </div>
                <div className="tradition-meta">Stellate Multi-Pointed Star Shrine</div>
                <p className="tradition-desc">
                  A synthesis of northern curvilinear grace and southern stepped tiers, famous for complex 16- and 32-point star ground plans and intricate friezes.
                </p>
                <ul className="tradition-specs">
                  <li><span>Canonical Treatise:</span> <span>Ishana Shivagurudeva</span></li>
                  <li><span>Primary Stone:</span> <span>Chloritic Schist & Soapstone</span></li>
                  <li><span>Core Regions:</span> <span>Deccan Plateau & Karnataka</span></li>
                </ul>
              </div>
            </div>
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
