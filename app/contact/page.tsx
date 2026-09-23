'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      state: (form.elements.namedItem('state') as HTMLSelectElement).value,
      location: (form.elements.namedItem('location') as HTMLInputElement).value,
      deity: (form.elements.namedItem('deity') as HTMLInputElement).value,
      tradition: (form.elements.namedItem('tradition') as HTMLSelectElement).value,
      budget: (form.elements.namedItem('budget') as HTMLSelectElement).value,
      landArea: (form.elements.namedItem('landArea') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value
    };

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setErrorMsg(data.message || 'Error submitting booking request.');
      }
    } catch (err) {
      setErrorMsg('Error connecting to server. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
      {/* Header Banner */}
      <section className="section" style={{ paddingTop: '8.5rem', paddingBottom: '3rem', background: 'var(--bg-paper)', borderBottom: '1px solid var(--border-stone)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
          <div className="eyebrow">Pan-India Turnkey Contract Portal</div>
          <h1 className="section-title">Temple Construction Booking Application</h1>
          <p className="section-desc">
            Direct turnkey consultation with Acharya Someshwar Sthapati. Complete structural planning, stone selection, 3D Shastra elevations, foundation engineering, and on-site crane erection.
          </p>
        </div>
      </section>

      {/* Main Form Wrapper */}
      <section className="section" style={{ paddingTop: '3.5rem' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div
            style={{
              background: '#FFFFFF',
              border: '2px solid var(--gold-primary)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(2rem, 5vw, 4rem)',
              boxShadow: '0 20px 50px rgba(41, 28, 20, 0.15)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--bg-paper)',
                  border: '1px solid var(--gold-primary)',
                  color: 'var(--saffron)',
                  padding: '0.4rem 1.25rem',
                  borderRadius: '30px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                🏛️ Official Pan-India Mandir Application
              </span>
              <h2 style={{ color: 'var(--maroon)', fontSize: '2rem', marginTop: '0.5rem' }}>
                Temple Project Scope & Booking Details
              </h2>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🕉️</div>
                <h3 style={{ color: 'var(--maroon)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>
                  Sacred Application Received Successfully
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
                  Om Namah Shivaya. Your temple construction request has been registered. Our Chief Master Contractor will reach out directly to review drawings, Vastu orientation, and site estimates.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-gold">
                  Submit Another Project Request →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMsg && (
                  <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', fontWeight: 600 }}>
                    {errorMsg}
                  </div>
                )}

                {/* Section 1: Client & Trust Information */}
                <h4 style={{ color: 'var(--maroon)', fontSize: '1.25rem', borderBottom: '2px solid rgba(198,162,74,0.3)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                  1. Trustee & Applicant Information
                </h4>

                <div className="form-row">
                  <div className="form-group">
                    <label>Trust / Patron / Applicant Name *</label>
                    <input type="text" name="name" className="form-control" placeholder="e.g. Rameshwar Sharma / Shri Ram Seva Trust" required />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number (WhatsApp Enabled) *</label>
                    <input type="tel" name="phone" className="form-control" placeholder="+91 98909 33567" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" className="form-control" placeholder="trustee@domain.com" />
                </div>

                {/* Section 2: Project Geography */}
                <h4 style={{ color: 'var(--maroon)', fontSize: '1.25rem', borderBottom: '2px solid rgba(198,162,74,0.3)', paddingBottom: '0.5rem', margin: '2rem 0 1.5rem' }}>
                  2. Project Site & State Location
                </h4>

                <div className="form-row">
                  <div className="form-group">
                    <label>State / Union Territory *</label>
                    <select name="state" className="form-control" defaultValue="Maharashtra">
                      <option value="Maharashtra">Maharashtra (Pune / Mumbai / Solapur)</option>
                      <option value="Gujarat">Gujarat (Ahmedabad / Somnath / Surat)</option>
                      <option value="Rajasthan">Rajasthan (Jaipur / Makrana / Jaisalmer)</option>
                      <option value="Karnataka">Karnataka (Bengaluru / Karkala / Udupi)</option>
                      <option value="Tamil Nadu">Tamil Nadu (Chennai / Madurai / Kanchipuram)</option>
                      <option value="Uttar Pradesh">Uttar Pradesh (Ayodhya / Varanasi / Mathura)</option>
                      <option value="Madhya Pradesh">Madhya Pradesh (Indore / Ujjain / Bhopal)</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Andhra Pradesh">Andhra Pradesh / Telangana</option>
                      <option value="Other Indian State">Other Indian State</option>
                      <option value="International Export">International (USA / UK / UAE / Australia)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Exact City / Town / Village *</label>
                    <input type="text" name="location" className="form-control" placeholder="e.g. Balewadi, Pune" required />
                  </div>
                </div>

                {/* Section 3: Deity, Tradition & Architecture */}
                <h4 style={{ color: 'var(--maroon)', fontSize: '1.25rem', borderBottom: '2px solid rgba(198,162,74,0.3)', paddingBottom: '0.5rem', margin: '2rem 0 1.5rem' }}>
                  3. Deity, Tradition & Architecture
                </h4>

                <div className="form-row">
                  <div className="form-group">
                    <label>Principal Presiding Deity</label>
                    <input type="text" name="deity" className="form-control" placeholder="e.g. Lord Shiva, Sri Balaji, Shri Ram, Devi Durga" />
                  </div>
                  <div className="form-group">
                    <label>Architectural Order</label>
                    <select name="tradition" className="form-control" defaultValue="Dravida (South Rajagopuram & Vimana)">
                      <option value="Dravida (South Rajagopuram & Vimana)">Dravida (South Rajagopuram & Vimana)</option>
                      <option value="Nagara (North Curvilinear Shikhara)">Nagara (North Curvilinear Shikhara)</option>
                      <option value="Vesara (Stellate Star Plan)">Vesara (Stellate Star Plan)</option>
                      <option value="Sthapati Discretion & Recommendation">Sthapati Discretion & Recommendation</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Budget Scope</label>
                    <select name="budget" className="form-control" defaultValue="₹50 Lakhs - ₹1.5 Crore (Medium Mandir)">
                      <option value="₹25 Lakhs - ₹50 Lakhs (Small Sanctum)">₹25 Lakhs - ₹50 Lakhs (Small Sanctum)</option>
                      <option value="₹50 Lakhs - ₹1.5 Crore (Medium Mandir)">₹50 Lakhs - ₹1.5 Crore (Medium Mandir)</option>
                      <option value="₹1.5 Crore - ₹5 Crore (Grand Temple Complex)">₹1.5 Crore - ₹5 Crore (Grand Temple Complex)</option>
                      <option value="₹5 Crore+ (Monumental Trust Project)">₹5 Crore+ (Monumental Trust Project)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Approx. Available Land Area</label>
                    <input type="text" name="landArea" className="form-control" placeholder="e.g. 5,000 sq.ft / 1 Acre / 2 Gunthas" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Specific Requirements / Shikhara Height / Mandapa Needs</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows={4}
                    placeholder="Provide additional details regarding soil status, RCC base readiness, stone preference (Makrana, Bansi Paharpur, Granite), or timeline..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '1.1rem', fontSize: '1rem' }} disabled={loading}>
                  {loading ? "Registering Sacred Application..." : "Submit Turnkey Temple Application →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
