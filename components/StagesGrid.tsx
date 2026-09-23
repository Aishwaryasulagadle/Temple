import React from 'react';

interface StagesGridProps {
  title?: string;
  eyebrow?: string;
  description?: string;
}

export default function StagesGrid({
  title = "One House · Seven Stages · No Handoffs",
  eyebrow = "From Quarry to Consecration",
  description = "Engineering, stone procurement, hand-carving, trial dry-fit, and Pan-India installation under one single master contract."
}: StagesGridProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{description}</p>
        </div>

        <div className="stages-grid">
          <div className="stage-card">
            <div className="stage-number">01</div>
            <div className="stage-name-row">
              <h3 className="stage-title">Site & Mandala</h3>
              <span className="stage-sanskrit">वास्तु</span>
            </div>
            <p className="stage-desc">
              True cardinal survey, soil bearing calculations, and the Vastupurusha grid struck on the ground.
            </p>
          </div>

          <div className="stage-card">
            <div className="stage-number">02</div>
            <div className="stage-name-row">
              <h3 className="stage-title">Shastra Drawing</h3>
              <span className="stage-sanskrit">रेखा</span>
            </div>
            <p className="stage-desc">
              Full elevation, section, and Agama iconography blueprints issued as buildable stone manifests.
            </p>
          </div>

          <div className="stage-card">
            <div className="stage-number">03</div>
            <div className="stage-name-row">
              <h3 className="stage-title">Cost Estimation</h3>
              <span className="stage-sanskrit">व्यय</span>
            </div>
            <p className="stage-desc">
              Transparent itemized stone volume, carving complexity, freight, and crane erection costing.
            </p>
          </div>

          <div className="stage-card">
            <div className="stage-number">04</div>
            <div className="stage-name-row">
              <h3 className="stage-title">Stone Sourcing</h3>
              <span className="stage-sanskrit">शिला</span>
            </div>
            <p className="stage-desc">
              Bansi Paharpur, Jaisalmer sandstone, Makrana marble, and monolithic granites tested and blocked.
            </p>
          </div>

          <div className="stage-card">
            <div className="stage-number">05</div>
            <div className="stage-name-row">
              <h3 className="stage-title">Karkhana Carving</h3>
              <span className="stage-sanskrit">शिल्प</span>
            </div>
            <p className="stage-desc">
              Hand-sculpted by generational Karigars with continuous inspection by our chief Sthapati.
            </p>
          </div>

          <div className="stage-card">
            <div className="stage-number">06</div>
            <div className="stage-name-row">
              <h3 className="stage-title">Dry-Fit & Crating</h3>
              <span className="stage-sanskrit">योजना</span>
            </div>
            <p className="stage-desc">
              Shrine trial-assembled at our yard, every stone numbered, and transported to your state.
            </p>
          </div>

          <div className="stage-card">
            <div className="stage-number">07</div>
            <div className="stage-name-row">
              <h3 className="stage-title">Pratishtha Rites</h3>
              <span className="stage-sanskrit">प्रतिष्ठा</span>
            </div>
            <p className="stage-desc">
              Our craftsmen raise the temple on site and stay through the final consecration rites.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
