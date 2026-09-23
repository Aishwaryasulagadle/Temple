'use client';

import React, { useState } from 'react';

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      deity: (form.elements.namedItem('deity') as HTMLInputElement).value,
      tradition: (form.elements.namedItem('tradition') as HTMLSelectElement).value,
      location: (form.elements.namedItem('location') as HTMLInputElement).value,
      budget: (form.elements.namedItem('budget') as HTMLSelectElement)?.value || '',
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
        form.reset();
        setSuccessMsg("🕉️ Your consultation request has been received. Our Sthapatis will connect with you!");
      } else {
        setErrorMsg(data.message || "Failed to submit enquiry.");
      }
    } catch (err) {
      setErrorMsg("Error submitting form. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" style={{ background: 'var(--bg-paper)' }}>
      <div className="container">
        <div className="contact-container">
          <div className="contact-info">
            <div className="eyebrow">Direct Sthapati Consultation</div>
            <h3>Initiate Your Sacred Temple Project</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              Whether you are an established temple trust, family committee, or private patron planning a monolithic granite sanctum or Nagara sandstone Shikhara, our master team provides full turnkey project consultation.
            </p>

            <div className="office-box">
              <h4>Head Contractor Office</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                📍 GINI Viviana, Balewadi Highstreet, Pune - 411045, Maharashtra, India
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                📞 Call: <a href="tel:+919890933567" style={{ color: 'var(--saffron)', fontWeight: 600 }}>+91 98909 33567</a>
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                ✉️ Email: temple@gmail.com
              </p>
            </div>
          </div>

          <div>
            {successMsg && (
              <div style={{ background: 'rgba(38,115,60,0.15)', border: '1px solid #26733c', color: '#26733c', padding: '1rem 1.5rem', borderRadius: '6px', marginBottom: '1.5rem', fontWeight: 600 }}>
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '1rem 1.5rem', borderRadius: '6px', marginBottom: '1.5rem', fontWeight: 600 }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} id="temple-enquiry-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Full Name *</label>
                  <input type="text" name="name" className="form-control" placeholder="e.g. Rameshwar Sharma" required />
                </div>
                <div className="form-group">
                  <label>Contact Number *</label>
                  <input type="tel" name="phone" className="form-control" placeholder="+91 98909 33567" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" className="form-control" placeholder="trustee@domain.com" />
                </div>
                <div className="form-group">
                  <label>Proposed Location / City *</label>
                  <input type="text" name="location" className="form-control" placeholder="e.g. Pune / Somnath / Ayodhya" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Principal Deity</label>
                  <input type="text" name="deity" className="form-control" placeholder="e.g. Lord Shiva, Balaji, Ram" />
                </div>
                <div className="form-group">
                  <label>Architectural Style</label>
                  <select name="tradition" className="form-control" defaultValue="Dravida (South Vimana & Rajagopuram)">
                    <option value="Dravida (South Vimana & Rajagopuram)">Dravida (South Vimana & Rajagopuram)</option>
                    <option value="Nagara (North Curvilinear Spire)">Nagara (North Curvilinear Spire)</option>
                    <option value="Vesara (Stellate Star Plan)">Vesara (Stellate Star Plan)</option>
                    <option value="Undecided / Sthapati Guidance Required">Undecided / Sthapati Guidance Required</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Estimated Project Budget Scope</label>
                <select name="budget" className="form-control" defaultValue="₹50 Lakhs - ₹1.5 Crore (Medium Shrine)">
                  <option value="₹25 Lakhs - ₹50 Lakhs (Small Sanctum)">₹25 Lakhs - ₹50 Lakhs (Small Sanctum)</option>
                  <option value="₹50 Lakhs - ₹1.5 Crore (Medium Shrine)">₹50 Lakhs - ₹1.5 Crore (Medium Shrine)</option>
                  <option value="₹1.5 Crore - ₹5 Crore (Grand Temple Complex)">₹1.5 Crore - ₹5 Crore (Grand Temple Complex)</option>
                  <option value="₹5 Crore+ (Monumental Trust Project)">₹5 Crore+ (Monumental Trust Project)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Vision & Land Details</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows={4}
                  placeholder="Describe your land dimensions, foundation status, required mandapas, or specific stone preferences..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-saffron" style={{ width: '100%', padding: '1rem' }} disabled={loading}>
                {loading ? "Submitting Sacred Request..." : "Submit Sacred Temple Request →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
