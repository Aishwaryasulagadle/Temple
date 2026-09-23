import Link from 'next/link';
import { readDb } from '@/lib/db';
import StagesGrid from '@/components/StagesGrid';

export const metadata = {
  title: 'Master Temple Contractor & Shilpa Shastra Architect | Pan-India Construction',
  description: 'Turnkey contract-based temple structure construction across Pan-India. Stone & RCC temples, Garbhagriha, Rajagopuram, and Shikhara execution from foundation to Pratishtha.'
};

export default function ContractorPage() {
  const db = readDb();
  const contractor = (db.contractor || {}) as import('@/lib/types').ContractorProfile;

  return (
    <main>
      {/* Banner */}
      <section className="section" style={{ paddingTop: '8.5rem', paddingBottom: '3.5rem', background: 'var(--bg-paper)', borderBottom: '1px solid var(--border-stone)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="eyebrow">Pan-India Turnkey Contract Specialist</div>
          <h1 className="section-title">Master Temple Structure Contractor</h1>
          <p className="section-desc" style={{ maxWidth: '800px', margin: '0 auto' }}>
            Undertaking complete turnkey temple contracts from any state or city across India. Complete design, stone procurement, foundation civil works, and structural raising.
          </p>
        </div>
      </section>

      {/* Contractor Profile Deep-Dive */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
            <div>
              <div className="eyebrow">Contractor Profile & Scope</div>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--maroon)', marginBottom: '1rem' }}>
                {contractor.name || "Acharya Someshwar Sthapati & Sons"}
              </h2>
              <p className="shloka" style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                “{contractor.experience || "35+ Years of Dedicated Turnkey Temple Structure Construction Across 22 States of India"}”
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>
                We operate on a <strong>single-point turnkey contract basis</strong>. Whether your project is in Gujarat, Maharashtra, Rajasthan, Tamil Nadu, Karnataka, Uttar Pradesh, or anywhere across India, our specialized civil and traditional stone guilds mobilize directly to your site.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
                {contractor.bio || "From deep soil testing, RCC plinth base engineering, to monolithic stone carving in our private karkhanas and crane erection of towering Rajagopurams and Shikharas — we take full responsibility until the final Kalasham installation and Pratishtha rites."}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-gold">
                  Hire for Temple Construction →
                </Link>
                <a href={`tel:${contractor.phone || '+919890933567'}`} className="btn btn-outline-gold">
                  Direct Call {contractor.phone || '+91 98909 33567'}
                </a>
              </div>
            </div>

            <div>
              <img
                src="/images/white_gopuram_hero.png"
                alt="Grand Temple Construction Work"
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--gold-primary)',
                  boxShadow: 'var(--shadow-card)',
                  width: '100%',
                  maxHeight: '520px',
                  objectFit: 'cover'
                }}
              />
              <p style={{ fontSize: '0.88rem', color: 'var(--saffron)', textAlign: 'center', marginTop: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                Featured Pan-India Project: 7-Tier White Monolith Rajagopuram with Golden Deities & Kalashams
              </p>
            </div>
          </div>

          {/* Turnkey Scope of Work Grid with 7 Stages in Zigzag */}
          <StagesGrid
            eyebrow="Complete Turnkey Capabilities"
            title="End-to-End Contract Execution"
            description="We eliminate the need to deal with multiple sub-contractors or separate suppliers."
          />

          {/* Live Site Work Visual Proof */}
          <div style={{ marginTop: '5rem', padding: '3rem', background: 'var(--bg-paper)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div className="eyebrow">Real Construction Proof</div>
              <h3 style={{ fontSize: '1.9rem', color: 'var(--maroon)', marginBottom: '0.5rem' }}>
                Live On-Ground Field Work by Our Contractor Guild
              </h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
                From bamboo scaffolding and brick corbelling to monolithic stone Sabha Mandapas and consecrated Mahadwaras.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-stone)', background: '#fff' }}>
                <img src="/images/site_work_mandapa_stone_hall.png" alt="Monolithic Stone Mandapa Hall" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '0.85rem', fontSize: '0.88rem', color: 'var(--maroon)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  Stone Hall Erection
                </div>
              </div>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-stone)', background: '#fff' }}>
                <img src="/images/site_work_tower_scaffolding.png" alt="Stepped Shikhara on Scaffolding" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '0.85rem', fontSize: '0.88rem', color: 'var(--maroon)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  Stepped Spire Masonry
                </div>
              </div>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-stone)', background: '#fff' }}>
                <img src="/images/site_work_artisan_carving_tower.jpg" alt="Artisan at 35+ Ft Height" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '0.85rem', fontSize: '0.88rem', color: 'var(--maroon)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  Artisans at 35+ Ft
                </div>
              </div>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-stone)', background: '#fff' }}>
                <img src="/images/site_work_mahadwara_archway.jpg" alt="Completed Sacred Mahadwara" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '0.85rem', fontSize: '0.88rem', color: 'var(--maroon)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  Consecrated Gateway
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/projects#live-site-gallery" className="btn btn-gold">
                View All Full-Size Site Photos on Projects Page →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pan-India Reach Coverage Map / State Listing */}
      <section className="section" style={{ background: 'var(--bg-paper)', borderTop: '1px solid var(--border-stone)' }}>
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">Geographical Coverage</div>
            <h2 className="section-title">Active Across Every Corner of India</h2>
            <p className="section-desc">We have mobilized projects in over 22 states and union territories.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="stage-card">
              <h3 style={{ color: 'var(--maroon)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>Western & Central Region</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                <strong>Maharashtra:</strong> Pune, Mumbai, Nashik, Kolhapur, Solapur, Nagpur.<br />
                <strong>Gujarat:</strong> Ahmedabad, Somnath, Dwarka, Surat, Vadodara.<br />
                <strong>Madhya Pradesh & Goa:</strong> Ujjain, Indore, Bhopal, Panaji.
              </p>
            </div>

            <div className="stage-card">
              <h3 style={{ color: 'var(--maroon)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>Northern & Eastern Region</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                <strong>Rajasthan:</strong> Jaipur, Makrana, Jaisalmer, Udaipur, Jodhpur.<br />
                <strong>Uttar Pradesh & Delhi NCR:</strong> Ayodhya, Varanasi, Mathura, Vrindavan, Noida.<br />
                <strong>Odisha & West Bengal:</strong> Puri, Bhubaneswar, Kolkata.
              </p>
            </div>

            <div className="stage-card">
              <h3 style={{ color: 'var(--maroon)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>Southern Peninsular Region</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                <strong>Tamil Nadu:</strong> Kanchipuram, Madurai, Thanjavur, Chennai, Coimbatore.<br />
                <strong>Karnataka:</strong> Bengaluru, Karkala, Belur, Udupi, Mysuru.<br />
                <strong>Andhra Pradesh & Telangana:</strong> Tirupati, Vijayawada, Hyderabad, Warangal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
