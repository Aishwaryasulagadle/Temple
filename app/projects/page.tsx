'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Temple } from '@/lib/types';
import TempleCard from '@/components/TempleCard';
import Lightbox from '@/components/Lightbox';

const SITE_PHOTOS = [
  {
    src: '/images/site_erection_elevated_shikhara.jpg',
    title: 'Monolithic Stone Shikhara Spire on Elevated Mandapa Platform',
    desc: 'Active on-ground erection of a tall grey stone Shikhara tower atop an elevated 4-pillar mandapa structure. Surrounded by heavy multi-tier bamboo scaffolding, devakoshta niches, tiered cornices, and sacred saffron kalasha flag fluttering against the sky.',
    badge: '🏗️ Live Spire Erection',
    captionTitle: 'Elevated Shikhara Spire Erection',
    captionDesc: 'Monolithic stone spire under active high-elevation assembly with multi-tier bamboo scaffolding on elevated sanctum columns.'
  },
  {
    src: '/images/site_grand_mandapa_tiered_vimana.jpg',
    title: 'Grand Carved Stone Sabha Mandapa & Multi-Tier Vimana Erection',
    desc: 'Comprehensive temple complex under active execution: open pillared Sabha Mandapa with cusped archways, carved stone balustrades, miniature kalasha parapet finials, and rising stepped Dravidian Vimana tower under bamboo staging.',
    badge: '🏛️ Mandapa & Vimana',
    captionTitle: 'Grand Mandapa & Tiered Vimana',
    captionDesc: 'Intricately carved stone mandapa hall with scalloped archways, ornamental balustrades, and multi-tier vimana spire staging.'
  },
  {
    src: '/images/site_corbelled_brick_dome_masonry.jpg',
    title: 'Vedic Corbelled Kiln-Brick Dome & Kalasha Base Craftsmanship',
    desc: 'Pure structural craftsmanship by master Sthapati artisans on the sanctum roof terrace. Building a spherical corbelled brick dome and stepped kalasha plinth with raw kiln-fired bricks, lime mortar, and central plumb alignment.',
    badge: '🧱 Sanctum Dome Masonry',
    captionTitle: 'Corbelled Brick Dome & Kalasha Base',
    captionDesc: 'Handcrafted kiln-brick spherical dome and stepped kalasha base constructed with ancient corbelled masonry techniques.'
  },
  {
    src: '/images/site_stone_spire_scaffolding.jpg',
    title: 'Monolithic Stone Vimana Spire & Multi-Tier Bamboo Scaffolding',
    desc: 'Active on-ground erection of a stepped Dravidian stone Vimana superstructure with full surrounding bamboo staging, tiered cornices, and kalasham finial alignment.',
    badge: '🏗️ Live Spire Erection',
    captionTitle: 'Dravidian Stone Vimana & Staging',
    captionDesc: 'Multi-tiered grey stone spire under active high-elevation craft assembly with traditional bamboo scaffolding.'
  },
  {
    src: '/images/site_brick_spire_mandapa.jpg',
    title: 'Pillared Mandapa & Brick-Core Stepped Shikhara with Kalasha',
    desc: 'On-ground construction of a carved stone pillared Mukha Mandapa hall surmounted by a multi-tiered brick-core Shikhara and dome pinnacle staging.',
    badge: '🧱 Civil & Shikhara Craft',
    captionTitle: 'Mandapa & Stepped Shikhara Core',
    captionDesc: 'Heavy monolithic carved columns supporting sanctum roof slab and active brick-and-mortar stepped shikhara superstructure.'
  },
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
    src: '/images/site_shikhara_bell_scaffolding.jpg',
    title: 'Consecrated Monumental Entrance Mahadwara & Shikhara',
    desc: 'Pure monolithic stone sanctum shikhara under construction with hand-sculpted sacred bell relief, auspicious swastika motifs, and layered cornices under traditional bamboo scaffolding.',
    badge: 'Consecrated Work',
    captionTitle: 'Finished Gateway Arch & Gopuram',
    captionDesc: 'Pure white monolithic entry portal framing the sanctum with ornamental stone rosettes and lintel mouldings.'
  },
  {
    src: '/images/site_tiered_shikhara_artisans.jpg',
    title: 'Monumental 7-Tier Dravidian & Nagara Shikhara',
    desc: 'Towering multi-tier stone Shikhara with intricately carved lotuses, ornamental kalashas, fluted pillars, and master artisans on site scaffolding.',
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

  const isMaharashtra = (t: Temple) => {
    const text = `${t.location || ''} ${t.state || ''} ${t.description || ''} ${t.name || ''}`.toLowerCase();
    return (
      text.includes('maharashtra') ||
      text.includes('pune') ||
      text.includes('mumbai') ||
      text.includes('jalgaon') ||
      text.includes('nanded') ||
      text.includes('ahilyanagar') ||
      text.includes('ahmednagar') ||
      text.includes('shrigonda') ||
      text.includes('jamner') ||
      text.includes('umarkhed') ||
      text.includes('ganganbeed') ||
      text.includes('nagpur') ||
      text.includes('nashik') ||
      text.includes('solapur') ||
      text.includes('kolhapur') ||
      text.includes('amravati') ||
      text.includes('aurangabad') ||
      text.includes('chhatrapati sambhajinagar') ||
      text.includes('satara') ||
      text.includes('sangli') ||
      text.includes('loha') ||
      text.includes('yavatmal') ||
      text.includes('arni') ||
      text.includes('latur') ||
      text.includes('nilanga') ||
      text.includes('mirghali') ||
      text.includes('bhootmungli') ||
      text.includes('bhootmugali') ||
      text.includes('madha') ||
      text.includes('kewad')
    );
  };

  const isKarnataka = (t: Temple) => {
    const text = `${t.location || ''} ${t.state || ''} ${t.description || ''} ${t.name || ''}`.toLowerCase();
    return (
      text.includes('karnatak') ||
      text.includes('belgaum') ||
      text.includes('belagavi') ||
      text.includes('bagalkot') ||
      text.includes('bagalkote') ||
      text.includes('kalaburagi') ||
      text.includes('kalburgi') ||
      text.includes('gulbarga') ||
      text.includes('bellary') ||
      text.includes('ballari') ||
      text.includes('vijayanagara') ||
      text.includes('badami') ||
      text.includes('belur') ||
      text.includes('hagaribommanahalli') ||
      text.includes('hadagali') ||
      text.includes('ramdurg') ||
      text.includes('sandur') ||
      text.includes('bengaluru') ||
      text.includes('bangalore') ||
      text.includes('mysuru') ||
      text.includes('mysore') ||
      text.includes('hubli') ||
      text.includes('dharwad') ||
      text.includes('mangalore') ||
      text.includes('mangaluru') ||
      text.includes('udupi') ||
      text.includes('karkala')
    );
  };

  const filteredTemples = temples.filter((t) => {
    let matchesState = true;
    if (filter === 'Maharashtra') {
      matchesState = isMaharashtra(t);
    } else if (filter === 'Karnataka' || filter === 'Karnatak') {
      matchesState = isKarnataka(t);
    }

    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.deity.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase()) ||
      t.stoneType.toLowerCase().includes(search.toLowerCase()) ||
      (t.tradition && t.tradition.toLowerCase().includes(search.toLowerCase()));

    return matchesState && matchesSearch;
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
              View Real On-Site Photos
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

      {/* SECTION 2: COMPLETE TEMPLE PROJECTS CATALOG */}
      <section id="all-projects-catalog" className="section" style={{ background: 'var(--bg-paper)', borderTop: '1px solid var(--border-stone)' }}>
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">Comprehensive Portfolio</div>
            <h2 className="section-title">Catalog of Consecrated & Active Mandir Works</h2>
            <p className="section-desc">
              Filter by state (Maharashtra, Karnataka) or search by deity, location, or stone type.
            </p>
          </div>

          {/* State Filter Bar */}
          <div className="filter-bar">
            {[
              { id: 'All', label: 'All State', count: temples.length },
              { id: 'Maharashtra', label: 'Maharashtra', count: temples.filter(isMaharashtra).length },
              { id: 'Karnataka', label: 'Karnataka', count: temples.filter(isKarnataka).length }
            ].map((stateItem) => (
              <button
                key={stateItem.id}
                className={`filter-btn ${filter === stateItem.id ? 'active' : ''}`}
                onClick={() => setFilter(stateItem.id)}
              >
                {stateItem.label} {stateItem.count > 0 ? `(${stateItem.count})` : ''}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ maxWidth: '480px', margin: '0 auto 3rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by deity, location, or marble/sandstone..."
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
