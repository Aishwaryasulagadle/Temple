import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readDb } from '@/lib/db';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const db = readDb();
  const temple = (db.temples || []).find((t) => t.id === id);
  if (!temple) return { title: 'Temple Not Found' };
  return {
    title: `${temple.name} | Shilpa Shastra Architectural Specification`,
    description: temple.description || 'Temple construction specification and details.'
  };
}

export default async function TempleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const db = readDb();
  const temple = (db.temples || []).find((t) => t.id === id);

  if (!temple) {
    notFound();
  }

  const isCompleted = temple.status === 'Completed';
  const badgeClass = isCompleted ? 'badge-completed' : 'badge-progress';

  return (
    <main className="section" style={{ paddingTop: '8.5rem', minHeight: '85vh' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          <Link href="/" style={{ color: 'var(--saffron)' }}>Home</Link>
          <span>/</span>
          <Link href="/projects" style={{ color: 'var(--saffron)' }}>Projects</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{temple.name}</span>
        </div>

        {/* Hero Banner Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3.5rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
              <span className={`temple-status-badge ${badgeClass}`} style={{ position: 'static' }}>
                {temple.status}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--saffron)', fontWeight: 600 }}>
                {temple.tradition} Architectural Order
              </span>
            </div>

            <h1 style={{ fontSize: '2.5rem', color: 'var(--maroon)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
              {temple.name}
            </h1>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-deep)', marginBottom: '1.5rem', fontWeight: 500 }}>
              Principal Deity: {temple.deity}
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem' }}>
              {temple.description}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-gold">
                Consult for Similar Temple →
              </Link>
              <Link href="/projects" className="btn btn-outline-gold">
                ← Back to All Projects
              </Link>
            </div>
          </div>

          <div>
            <img
              src={temple.coverImage || '/images/somnath_grand.png'}
              alt={temple.name}
              style={{
                width: '100%',
                maxHeight: '480px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--gold-primary)',
                boxShadow: 'var(--shadow-card)'
              }}
            />
          </div>
        </div>

        {/* Specifications Table & Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', marginBottom: '4rem' }}>
          {/* Architectural Specs Box */}
          <div style={{ background: 'var(--bg-paper)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-md)', padding: '2.25rem', boxShadow: 'var(--shadow-card)' }}>
            <h3 style={{ color: 'var(--maroon)', fontSize: '1.35rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-stone)', paddingBottom: '0.75rem' }}>
              📐 Engineering & Stone Specs
            </h3>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-stone)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Primary Stone:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.92rem' }}>{temple.stoneType}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-stone)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Tower Superstructure:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.92rem' }}>{temple.subType}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-stone)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Maximum Height:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.92rem' }}>{temple.height}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-stone)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Built-up Mandapa Area:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.92rem' }}>{temple.area}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-stone)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Location / State:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.92rem' }}>{temple.location}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Execution Year:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.92rem' }}>{temple.year}</span>
              </li>
            </ul>
          </div>

          {/* Canonical Features Box */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-stone)', borderRadius: 'var(--radius-md)', padding: '2.25rem', boxShadow: 'var(--shadow-card)' }}>
            <h3 style={{ color: 'var(--maroon)', fontSize: '1.35rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-stone)', paddingBottom: '0.75rem' }}>
              Shastra Architecture Highlights
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {(temple.features || []).map((feat, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold-primary)', fontSize: '1.2rem', lineHeight: 1 }}>🪷</span>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{feat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery of Temple Photos */}
        {temple.images && temple.images.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ color: 'var(--maroon)', fontSize: '1.6rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              Architectural Photo Gallery
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {temple.images.map((img, idx) => (
                <div key={idx} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-stone)', height: '260px' }}>
                  <img src={img} alt={`${temple.name} - Photo ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
