'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Hide main footer on admin portal
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="text-gold">THE TEMPLE CONSTRUCT</h3>
            <p>
              Pan-India master stone temple architects & turnkey contractors rooted in classical Shilpa Shastra. Sourcing quarries, carving stone, and executing turnkey temple structures across all 28 states of India.
            </p>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/contractor">Master Contractor Details</Link>
              </li>
              <li>
                <Link href="/projects">Projects & Gallery</Link>
              </li>
              <li>
                <Link href="/about">Lineage & History</Link>
              </li>
              <li>
                <Link href="/contact">Book Temple Construction</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Traditions</h4>
            <ul className="footer-links">
              <li>
                <Link href="/projects?tradition=Dravida">Dravida Vimana</Link>
              </li>
              <li>
                <Link href="/projects?tradition=Nagara">Nagara Shikhara</Link>
              </li>
              <li>
                <Link href="/projects?tradition=Vesara">Vesara Stellate</Link>
              </li>
              <li>
                <Link href="/about">7 Stages of Craft</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect Directly</h4>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              GINI Viviana, Balewadi Highstreet, Pune - 411045, Maharashtra, India
            </p>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              📞{' '}
              <a href="tel:+919890933567" style={{ color: 'var(--gold-light)' }}>
                +91 98909 33567
              </a>
            </p>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '0.9rem' }}>
              ✉️ temple@gmail.com
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} The Divine Temple Construction India. Shilpa Shastra · Agama · Vastu.</div>
          <div>Turnkey Temple Construction Across Pan-India</div>
        </div>
      </div>
    </footer>
  );
}
