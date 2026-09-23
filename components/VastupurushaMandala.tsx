'use client';

import React, { useState } from 'react';

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

export default function VastupurushaMandala() {
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  const [infoTitle, setInfoTitle] = useState("Brahmasthana (The Sacred Nucleus)");
  const [infoDesc, setInfoDesc] = useState(
    "The central 9 cells of the 81-cell Paramasayika Mandala. In Vedic temple architecture, this zone remains completely unweighted by heavy superstructures, channeling cosmic prana directly to the deity's Garbhagriha."
  );

  const handleMouseEnter = (row: number, col: number) => {
    setActiveCell({ row, col });
    const isBrahma = row >= 3 && row <= 5 && col >= 3 && col <= 5;
    const devataText = devataGrid[row][col];

    if (isBrahma) {
      setInfoTitle("Brahmasthana (The Sacred Nucleus)");
      setInfoDesc(
        "The central 9 cells of the 81-cell Paramasayika Mandala. In Vedic temple architecture, this zone remains completely unweighted by heavy superstructures, channeling cosmic prana directly to the deity's Garbhagriha."
      );
    } else {
      const formattedName = devataText.replace('\n', ' ');
      setInfoTitle(`Pada [${row + 1}, ${col + 1}]: ${formattedName}`);
      setInfoDesc(
        `Governed by sacred deity ${formattedName}. This consecrated boundary quadrant dictates the placement of outer mandapas, circumambulatory pradakshina paths, gopurams, and ritual water bodies.`
      );
    }
  };

  return (
    <section id="mandala" className="section dark-section">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Sacred Geometry</div>
          <h2 className="section-title">The Vastupurusha Mandala</h2>
          <p className="section-desc">
            Before a single stone is carved, the cosmic grid of 81 cells (Paramasayika) is struck on the earth. Hover over the grid to explore sacred placements.
          </p>
        </div>

        <div className="mandala-split">
          <div>
            <div id="mandala-grid" className="mandala-grid-canvas">
              {devataGrid.map((rowArr, row) =>
                rowArr.map((devataText, col) => {
                  const isBrahma = row >= 3 && row <= 5 && col >= 3 && col <= 5;
                  const isCenterCore = row === 4 && col === 4;
                  const isActive = activeCell?.row === row && activeCell?.col === col;
                  const shortName = devataText.split('\n')[0];

                  return (
                    <div
                      key={`${row}-${col}`}
                      className={`mandala-cell ${isBrahma ? 'brahma' : ''} ${isActive ? 'active' : ''}`}
                      onMouseEnter={() => handleMouseEnter(row, col)}
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
            <p style={{ textAlign: 'center', color: 'var(--gold-light)', fontSize: '0.88rem', marginTop: '1rem', fontFamily: 'var(--font-mono)' }}>
              81-Cell Paramasayika Grid (Centre 9 Gold Cells: Brahmasthana)
            </p>
          </div>

          <div className="anatomy-details-panel" style={{ background: 'var(--bg-dark-card)', borderColor: 'var(--gold-primary)' }}>
            <div className="eyebrow">Sanctum Geometry</div>
            <h3 id="mandala-info-title" style={{ color: 'var(--gold-light)', fontSize: '1.8rem', marginBottom: '1rem' }}>
              {infoTitle}
            </h3>
            <p id="mandala-info-desc" style={{ color: 'var(--text-light-muted)', fontSize: '1.02rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {infoDesc}
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
