import Link from 'next/link';

export const metadata = {
  title: 'About Us & Lineage | The Temple Construction India',
  description: 'Four generations of Shilpa Shastra temple masters from Harishchandra Tanda to global monuments in India, Dubai, USA, and UK.'
};

export default function AboutPage() {
  return (
    <main>
      {/* Banner */}
      <section className="section" style={{ paddingTop: '8.5rem', paddingBottom: '3.5rem', background: 'var(--bg-paper)', borderBottom: '1px solid var(--border-stone)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="eyebrow">Our Lineage & Philosophy</div>
          <h1 className="section-title">Generations of Sacred Craftsmanship</h1>
          <p className="section-desc" style={{ maxWidth: '750px', margin: '0 auto' }}>
            From traditional gurukul discipleship to more than a thousand sanctums raised across Pan-India and overseas.
          </p>
        </div>
      </section>

      {/* Story & Lineage Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div className="eyebrow">The Lineage Story</div>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--maroon)', marginBottom: '1.5rem', lineHeight: 1.3 }}>
                Ancient Shastra Practice, <br /><span className="text-gold">Kept Honest by Modern Measurement</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Our ancestors began their journey alongside master temple builders of South India. Through rigorous discipleship, they internalized the canonical treatises—the <em>Manasara</em>, <em>Mayamata</em>, and <em>Shilpa Ratnakara</em>.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Today, the 4th generation combines generational artisans with civil engineers trained at premier institutes. We handle high-precision 3D structural modeling, seismic engineering, and international shipping logistics while strictly adhering to every rule of sacred geometry.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
                  <h4 style={{ color: 'var(--maroon)', fontSize: '1.1rem', marginBottom: '0.35rem' }}>Gen I - II</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Discipleship in classical stone carving</p>
                </div>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
                  <h4 style={{ color: 'var(--maroon)', fontSize: '1.1rem', marginBottom: '0.35rem' }}>Gen III</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Established stone yards & karkhanas in Pune</p>
                </div>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
                  <h4 style={{ color: 'var(--maroon)', fontSize: '1.1rem', marginBottom: '0.35rem' }}>Gen IV</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pan-India turnkey contracts & global exports</p>
                </div>
              </div>
            </div>

            <div>
              <img
                src="/images/carving_detail_1.png"
                alt="Master Stone Carver at work"
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--gold-primary)',
                  boxShadow: 'var(--shadow-card)',
                  width: '100%'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence & Quality Rigor */}
      <section className="section" style={{ background: 'var(--bg-paper)', borderTop: '1px solid var(--border-stone)' }}>
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">Execution Rigor</div>
            <h2 className="section-title">From Private Quarry to Site Consecration</h2>
            <p className="section-desc">We manage quarrying, carving, logistics, crane erection, and rituals for trusts across India.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'var(--bg-card)', padding: '2.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-stone)', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📦</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--maroon)' }}>Full Dry-Fit Before Shipping</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                The temple is completely dry-assembled at our Pune karkhana, corrected for millimeter tolerances, and numbered before transit so zero delays happen on your site.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '2.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-stone)', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔢</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--maroon)' }}>Laser Coded & Numbered Stone</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Every single stone bears an immutable coordinate that matches the architectural blueprint for swift crane and manual erection.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '2.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-stone)', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✈️</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--maroon)' }}>Artisans Travel With Consignment</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Our master sculptors, Sthapatis, and lifting crew travel directly with the stone consignments to raise the sanctum anywhere in India.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
