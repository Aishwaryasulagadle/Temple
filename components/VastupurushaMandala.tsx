'use client';

import React, { useState, useEffect } from 'react';

const devataGrid = [
  ["ईशान\n(Ishana)", "पर्जन्य\n(Parjanya)", "जयन्त\n(Jayanta)", "इन्द्र\n(Indra)", "सूर्य\n(Surya)", "सत्य\n(Satya)", "भृश\n(Bhrisha)", "अन्तरिक्ष\n(Antariksha)", "अग्नि\n(Agni)"],
  ["दिति\n(Diti)", "आप\n(Aapa)", "आप\n(Aapa)", "मरीचि\n(Marichi)", "मरीचि\n(Marichi)", "मरीचि\n(Marichi)", "सावित्री\n(Savitri)", "सावित्री\n(Savitri)", "पूषा\n(Pusha)"],
  ["अदिति\n(Aditi)", "आप\n(Aapa)", "आप\n(Aapa)", "मरीचि\n(Marichi)", "मरीचि\n(Marichi)", "मरीचि\n(Marichi)", "सावित्री\n(Savitri)", "सावित्री\n(Savitri)", "वितथ\n(Vitatha)"],
  ["सोम\n(Soma)", "भूधर\n(Bhudhara)", "भूधर\n(Bhudhara)", "ब्रह्मा\n(Brahma)", "ब्रह्मा\n(Brahma)", "ब्रह्मा\n(Brahma)", "विवस्वान्\n(Vivaswan)", "विवस्वान्\n(Vivaswan)", "गृहक्षत\n(Grihakhata)"],
  ["सोम\n(Soma)", "भूधर\n(Bhudhara)", "भूधर\n(Bhudhara)", "ब्रह्मा\n(Brahma)", "ब्रह्मस्थान\n(Hridaya)", "ब्रह्मा\n(Brahma)", "विवस्वान्\n(Vivaswan)", "विवस्वान्\n(Vivaswan)", "यम\n(Yama)"],
  ["भल्लाट\n(Bhallata)", "भूधर\n(Bhudhara)", "भूधर\n(Bhudhara)", "ब्रह्मा\n(Brahma)", "ब्रह्मा\n(Brahma)", "ब्रह्मा\n(Brahma)", "विवस्वान्\n(Vivaswan)", "विवस्वान्\n(Vivaswan)", "गन्धर्व\n(Gandharva)"],
  ["मुख्य\n(Mukhya)", "रुद्र\n(Rudra)", "रुद्र\n(Rudra)", "मित्र\n(Mitra)", "मित्र\n(Mitra)", "मित्र\n(Mitra)", "इन्द्र\n(Indra)", "इन्द्र\n(Indra)", "भृङ्गराज\n(Bhrngaraja)"],
  ["नाग\n(Naga)", "रुद्र\n(Rudra)", "रुद्र\n(Rudra)", "मित्र\n(Mitra)", "मित्र\n(Mitra)", "मित्र\n(Mitra)", "इन्द्र\n(Indra)", "इन्द्र\n(Indra)", "मृग\n(Mriga)"],
  ["वायु\n(Vayu)", "शोष\n(Shosha)", "असुर\n(Asura)", "वरुण\n(Varuna)", "पुष्पदन्त\n(Pushpadanta)", "सुग्रीव\n(Sugriva)", "दौवारिक\n(Dauvarika)", "पितृ\n(Pitri)", "निर्ऋति\n(Nirriti)"]
];

function getPadaInfo(row: number, col: number) {
  const isBrahma = row >= 3 && row <= 5 && col >= 3 && col <= 5;
  const isCenterCore = row === 4 && col === 4;
  const devataRaw = devataGrid[row][col];
  const devataName = devataRaw.replace('\n', ' ');

  if (isCenterCore) {
    return {
      title: "ब्रह्मस्थान हृदय • Brahmasthana (Core Bindu)",
      padaLabel: "Pada [5, 5] (Centre Heart)",
      zone: "Bindu • Supreme Unweighted Garbhagriha Core",
      desc: "The absolute nexus of the 81-cell Paramasayika Mandala. In Vedic temple architecture, this zone remains completely open and unweighted by heavy superstructures, channeling cosmic prana directly through the deity's sanctum sanctorum."
    };
  }

  if (isBrahma) {
    return {
      title: `ब्रह्मस्थान • Brahmasthana [${row + 1}, ${col + 1}]`,
      padaLabel: `Pada [${row + 1}, ${col + 1}] (Inner Sanctum)`,
      zone: "Brahma Mandala (Center 9 Cells)",
      desc: "One of the 9 central sacred cells consecrated to Lord Brahma. Sthapatis preserve this nucleus from heavy load-bearing pillars so that divine resonance circulates freely through the Garbhagriha."
    };
  }

  return {
    title: `Pada [${row + 1}, ${col + 1}]: ${devataName}`,
    padaLabel: `Pada [${row + 1}, ${col + 1}]`,
    zone: "Daivika & Manusha Mandala Quadrant",
    desc: `Governed by sacred deity ${devataName}. This consecrated boundary quadrant dictates the placement of outer mandapas, circumambulatory pradakshina paths, gopurams, and ritual water bodies.`
  };
}

export default function VastupurushaMandala() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance to the next box on a 2-second timeline (2000ms)
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 81);
    }, 2000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered]);

  const activeRow = Math.floor(currentIndex / 9);
  const activeCol = currentIndex % 9;
  const activeInfo = getPadaInfo(activeRow, activeCol);

  const handleCellSelect = (row: number, col: number) => {
    setCurrentIndex(row * 9 + col);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + 81) % 81);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % 81);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  return (
    <section id="mandala" className="section dark-section">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Sacred Geometry</div>
          <h2 className="section-title">The Vastupurusha Mandala</h2>
          <p className="section-desc">
            Before a single stone is carved, the cosmic grid of 81 cells (Paramasayika) is struck on the earth. Hover over the grid to explore sacred placements or follow the automated 2-second sacred tour.
          </p>
        </div>

        <div className="mandala-split">
          <div>
            <div
              id="mandala-grid"
              className="mandala-grid-canvas"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {devataGrid.map((rowArr, row) =>
                rowArr.map((devataText, col) => {
                  const cellIndex = row * 9 + col;
                  const isBrahma = row >= 3 && row <= 5 && col >= 3 && col <= 5;
                  const isCenterCore = row === 4 && col === 4;
                  const isActive = cellIndex === currentIndex;
                  const shortName = devataText.split('\n')[0];

                  return (
                    <div
                      key={`${row}-${col}`}
                      className={`mandala-cell ${isBrahma ? 'brahma' : ''} ${isActive ? 'active' : ''}`}
                      onMouseEnter={() => handleCellSelect(row, col)}
                      onClick={() => handleCellSelect(row, col)}
                      title={
                        isBrahma
                          ? "Brahmasthana (Centre 9 Cells) - Sacred Unweighted Garbhagriha Core"
                          : `Vastupurusha Pada [${row + 1}, ${col + 1}]: ${devataText.replace('\n', ' ')}`
                      }
                    >
                      {isCenterCore ? (
                        <>
                          <span className="cell-om">ॐ</span>
                          <span className="cell-label">ब्रह्मस्थान</span>
                        </>
                      ) : isBrahma ? (
                        <span className="cell-label">ब्रह्मा</span>
                      ) : (
                        <span className="cell-label">{shortName}</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* 2-Second Timeline Bar & Controls */}
            <div className="mandala-timeline-wrapper">
              <div className="mandala-timeline-track">
                <div
                  key={`${currentIndex}-${isAutoPlaying && !isHovered}`}
                  className={`mandala-timeline-bar ${isAutoPlaying && !isHovered ? 'animating' : 'paused'}`}
                />
              </div>
              <div className="mandala-timeline-footer">
                <div className="mandala-timeline-badge">
                  <span className={`mandala-timeline-pulse-dot ${!isAutoPlaying || isHovered ? 'paused' : ''}`} />
                  <span>
                    {isHovered ? 'Hovering (Paused)' : isAutoPlaying ? '2s Timeline Tour' : 'Paused'}
                  </span>
                  <span style={{ opacity: 0.65, fontSize: '0.78rem' }}>
                    • Box {currentIndex + 1}/81
                  </span>
                </div>

                <div className="mandala-timeline-actions">
                  <button
                    type="button"
                    className="mandala-btn-icon"
                    onClick={handlePrev}
                    title="Previous Pada Box"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="mandala-btn-icon"
                    onClick={toggleAutoPlay}
                    title={isAutoPlaying ? "Pause 2s Timeline" : "Start 2s Timeline"}
                  >
                    {isAutoPlaying ? '⏸' : '▶'}
                  </button>
                  <button
                    type="button"
                    className="mandala-btn-icon"
                    onClick={handleNext}
                    title="Next Pada Box"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            <p style={{ textAlign: 'center', color: 'var(--gold-light)', fontSize: '0.88rem', marginTop: '0.85rem', fontFamily: 'var(--font-mono)' }}>
              81-Cell Paramasayika Grid (Centre 9 Gold Cells: Brahmasthana)
            </p>
          </div>

          <div className="anatomy-details-panel" style={{ background: 'var(--bg-dark-card)', borderColor: 'var(--gold-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <div className="eyebrow" style={{ margin: 0 }}>Sanctum Geometry</div>
              <span style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--gold-primary)',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                padding: '0.2rem 0.55rem',
                borderRadius: '4px'
              }}>
                {activeInfo.padaLabel}
              </span>
            </div>

            <h3 id="mandala-info-title" style={{ color: 'var(--gold-light)', fontSize: '1.65rem', marginBottom: '0.4rem', lineHeight: '1.3' }}>
              {activeInfo.title}
            </h3>
            <div style={{ color: 'var(--gold-primary)', fontSize: '0.85rem', marginBottom: '1.1rem', fontStyle: 'italic' }}>
              {activeInfo.zone}
            </div>
            <p id="mandala-info-desc" style={{ color: 'var(--text-light-muted)', fontSize: '1.02rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {activeInfo.desc}
            </p>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '3px solid var(--gold-primary)', padding: '1.25rem' }}>
              <h4 style={{ color: 'var(--gold-light)', fontSize: '1rem', marginBottom: '0.35rem' }}>Rule of the Sthapati</h4>
              <p style={{ fontSize: '0.9rem', color: '#D3C7BD' }}>
                "The proportion of every pillar, beam, corniche, and finial is mathematically tethered to the width of the sanctum (Garbhagriha module)."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
