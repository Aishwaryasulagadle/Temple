'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide main navbar on admin portal
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-wrap">
        <Link href="/" className="brand-logo">
          <img
            src="/images/omkar_logo.jpg"
            alt="Omkar Temple Construction Logo"
            className="brand-logo-img"
          />
          <div className="brand-text">
            <h2>OMKAR TEMPLE CONSTRUCT</h2>
            <span>MASTER CONTRACTOR · PAN-INDIA</span>
          </div>
        </Link>

        <ul className="nav-links">
          <li>
            <Link href="/" className={pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className={pathname === '/projects' ? 'active' : ''}>
              Projects & Gallery
            </Link>
          </li>
          <li>
            <Link href="/contractor" className={pathname === '/contractor' ? 'active' : ''}>
              Master Contractor
            </Link>
          </li>
          <li>
            <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
              Lineage & Craft
            </Link>
          </li>
          <li>
            <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>
              Book Temple Construction
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          <a
            href="https://wa.me/919890933567?text=Namaste%20Acharya%20Ji,%20I%20want%20to%20consult%20for%20temple%20construction."
            target="_blank"
            rel="noopener noreferrer"
            className="nav-whatsapp-btn"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </header>
  );
}
