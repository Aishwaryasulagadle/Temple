'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Temple } from '@/lib/types';
import TempleCard from '@/components/TempleCard';
import Lightbox from '@/components/Lightbox';

const SITE_PHOTOS = [
  {
    src: '/images/site_work_tower_scaffolding.png',
    title: 'Multi-Tier Stepped Shikhara & Bamboo Scaffolding',
    desc: 'Live stepped corbelled brick and stone Shikhara tower under active elevation staging. Engineered with traditional interlocking load distribution and precision plumb line calibration.',
    badge: '🏗️ Live Site Work',
    captionTitle: 'Multi-Tier Stepped Shikhara Erection',
    captionDesc: 'High-precision brick and stone tiered spire masonry resting upon the sanctum slab with heavy bamboo staging.'
  },
  {
    src: '/images/site_work_mandapa_stone_hall.png',
    title: 'Maha Sabha Mandapa & Monolithic Pillared Hall',
    desc: 'Massive open Mandapa featuring monolithic hand-dressed granite pillars, dry-fit beam headers, projecting stone eaves (Chhajja), and sanctum shikhara superstructure under active construction.',
    badge: '🏛️ Stone Civil & Mandapa',
    captionTitle: 'Maha Sabha Mandapa & Stone Pillars',
    captionDesc: '16 monolithic carved granite column shafts with interlocking lintel beams and rising sanctum tower.'
  },
  {
    src: '/images/site_work_artisan_carving_tower.jpg',
    title: 'Master Sthapati Artisans at 35+ Ft Elevation',
    desc: 'Master craftsman carrying out precision brick alignment, tier shaping, and sacred kalasha pinnacle alignment at high elevation using classical Shilpa Shastra metrics.',
    badge: '👷 Height Masonry Work',
    captionTitle: 'Master Sthapati at 35+ Ft Elevation',
    captionDesc: 'Precision level alignment on stepped tower masonry using traditional plumb-bob and brass templates.'
  },
  {
    src: '/images/site_work_mahadwara_archway.jpg',
    title: 'Consecrated Monumental Entrance Mahadwara',
    desc: 'Awe-inspiring completed white Rajagopuram archway with decorative relief moulding, lotus rosettes, and sanctum passage doorway.',
    badge: '✨ Consecrated Work',
    captionTitle: 'Finished Gateway Arch & Gopuram',
    captionDesc: 'Pure white monolithic entry portal framing the sanctum with ornamental stone rosettes and lintel mouldings.'
  },
  {
    src: '/images/white_gopuram_hero.png',
    title: 'Monumental 7-Tier White Dravidian Rajagopuram',
    desc: 'Magnificent multi-tiered white Rajagopuram with gold deity sculptures and 9 golden Kalasham pinnacles erected under turnkey contract.',
    badge: '🌟 Monumental Turnkey',
    captionTitle: '7-Tier White Gopuram & Kalashams',
    captionDesc: '128 ft white Dravidian tower with golden sculptures and 9 gold kalashas erected with heavy cranes.'
  },
  {
    src: '/images/carving_detail_1.png',
    title: 'Intricate Sanctum Ceiling & Mandapa Pillar Carving',
    desc: 'Generational stone sculptors executing fine chisel relief work on hard granite and Bansi Paharpur sandstone in our private karkhana.',
    badge: '🔨 Hand-Carving Guild',
    captionTitle: 'Deep Relief Stone Ornamentation',
    captionDesc: 'Over 350 Karigars hand-chiseling intricate deity panels, floral creepers, and mandala lotuses.'
  }
];

export default function ProjectsPage() {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [lightboxData, setLightboxData] = useState<{ isOpen: boolean; src: string; title: string; desc: string }>({
    isOpen: false,
    src: '',
    title: '',
    desc: ''
  });

  useEffect(() => {
    fetch('/api/temples')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setTemples(data.data);
        }
      })
      .catch((err) => console.error('Error fetching temples:', err));
  }, []);

  const filteredTemples = temples.filter((t) => {
    const matchesTradition = filter === 'All' || t.tradition.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.deity.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase()) ||
      t.stoneType.toLowerCase().includes(search.toLowerCase());
    return matchesTradition && matchesSearch;
  });

  const openLightbox = (src: string, title: string, desc: string) => {
    setLightboxData({ isOpen: true, src, title, desc });
  };

  const closeLightbox = () => {
    setLightboxData({ isOpen: false, src: '', title: '', desc: '' });
  };

  return (
    <main>
      {/* Page Banner */}
      <section className="section" style={{ paddingTop: '8.5rem', paddingBottom: '3.5rem', background: 'var(--bg-paper)', borderBottom: '1px solid var(--border-stone)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="eyebrow">Real Field Works & Consecrations</div>
          <h1 className="section-title">Temple Projects & Live On-Site Gallery</h1>
          <p className="section-desc" style={{ maxWidth: '780px', margin: '0 auto' }}>
            Witness our actual on-ground execution across India — from monolithic granite pillar erection, raw kiln-brick corbelled Shikhara spires on bamboo scaffolding, to consecrated white Mahadwara gateways.
          </p>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#live-site-gallery" className="btn btn-gold">
              📸 View Real On-Site Photos
            </a>
            <a href="#all-projects-catalog" className="btn btn-outline-gold">
              🏛️ Browse All Projects Catalog
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1: REAL ON-SITE WORK PHOTO GALLERY */}
      <section id="live-site-gallery" className="section" style={{ paddingTop: '4.5rem' }}>
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">Direct From The Construction Sites</div>
            <h2 className="section-title">Live On-Ground Construction & Erection Showcase</h2>
            <p className="section-desc">
              Click any photo to inspect in full-resolution zoom. Real craftsmanship executed by our travelling Sthapatis and artisan guilds anywhere in Pan-India.
            </p>
          </div>

          <div className="site-gallery-grid">
            {SITE_PHOTOS.map((photo, index) => (
              <div
                key={index}
                className="site-photo-card"
                onClick={() => openLightbox(photo.src, photo.title, photo.desc)}
              >
                <div className="site-photo-img-wrap">
                  <img src={photo.src} alt={photo.title} loading="lazy" />
                  <span className="site-photo-overlay-badge">{photo.badge}</span>
                  <div className="site-photo-zoom-icon">🔍</div>
                </div>
                <div className="site-photo-details">
                  <h4>{photo.captionTitle}</h4>
                  <p>{photo.captionDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPLETE 13 TEMPLE PROJECTS CATALOG */}
      <section id="all-projects-catalog" className="section" style={{ background: 'var(--bg-paper)', borderTop: '1px solid var(--border-stone)' }}>
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">Comprehensive Portfolio</div>
            <h2 className="section-title">Catalog of Consecrated & Active Mandir Works</h2>
            <p className="section-desc">
              Filter by canonical Shilpa Shastra tradition or search by deity, location, or stone type.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="filter-bar">
            {['All', 'Dravida', 'Nagara', 'Vesara'].map((trad) => (
              <button
                key={trad}
                className={`filter-btn ${filter === trad ? 'active' : ''}`}
                onClick={() => setFilter(trad)}
              >
                {trad === 'All' ? 'All Traditions (13 Projects)' : `${trad} Orders`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ maxWidth: '480px', margin: '0 auto 3rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search by deity, location, or marble/sandstone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ textAlign: 'center' }}
            />
          </div>

          {/* Temples Grid */}
          <div className="temples-grid">
            {filteredTemples.map((temple) => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>

          {filteredTemples.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              No projects found matching your search.
            </div>
          )}
        </div>
      </section>

      {/* CONTRACTOR CALL TO ACTION */}
      <section className="section dark-section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
          <div className="eyebrow">Turnkey Construction Inquiries</div>
          <h2 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '1.25rem' }}>
            Planning a Sacred Shrine or Monumental Temple?
          </h2>
          <p style={{ color: 'var(--text-light-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            Whether you require monolithic stone carving, on-site brick Shikhara masonry, or complete end-to-end turnkey civil construction anywhere across India, Acharya Someshwar Sthapati provides direct master contractor consultation.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-gold" style={{ padding: '1rem 2.2rem' }}>
              📝 Fill Temple Construction Application Form →
            </Link>
            <Link href="/contractor" className="btn btn-saffron" style={{ padding: '1rem 2.2rem' }}>
              👷 View Contractor Work Details
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxData.isOpen}
        imgSrc={lightboxData.src}
        title={lightboxData.title}
        desc={lightboxData.desc}
        onClose={closeLightbox}
      />
    </main>
  );
}
