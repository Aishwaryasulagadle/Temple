'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Hide main navbar on admin portal
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/contractor', label: 'Master Contractor' },
    { href: '/about', label: 'Craft' },
    { href: '/contact', label: 'Book Temple Construction' },
  ];

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-wrap">
          {/* Brand Logo Only */}
          <Link href="/" className="brand-logo" aria-label="Home">
            <img
              src="/images/omkar_logo.jpg"
              alt="Omkar Temple Construction"
              className="brand-logo-img"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-links">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={isActive ? 'active' : ''}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className={`mobile-toggle-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'show' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Menu */}
      <aside
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="brand-logo">
            <img
              src="/images/omkar_logo.jpg"
              alt="Omkar Temple Construction"
              className="brand-logo-img"
              style={{ width: '48px', height: '48px' }}
            />
          </Link>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="mobile-drawer-nav">
          <ul className="mobile-nav-links">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="nav-arrow">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-drawer-footer">
          <a
            href="https://wa.me/919890933567?text=Namaste%20Acharya%20Ji,%20I%20want%20to%20consult%20for%20temple%20construction."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            💬 Consult on WhatsApp
          </a>
        </div>
      </aside>
    </>
  );
}

