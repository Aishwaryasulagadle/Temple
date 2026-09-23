'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Temple, Enquiry } from '@/lib/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'temples' | 'enquiries'>('dashboard');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('temple@gmail.com');
  const [loginPassword, setLoginPassword] = useState('temple123');
  const [loginError, setLoginError] = useState('');

  const [temples, setTemples] = useState<Temple[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [toastMsg, setToastMsg] = useState('');

  // Modal State for Add / Edit Temple
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const initialFormState = {
    name: '',
    deity: '',
    tradition: 'Dravida',
    subType: '',
    stoneType: '',
    location: '',
    country: 'India',
    status: 'Completed',
    year: '2024',
    height: '',
    area: '',
    coverImage: '/images/white_gopuram_hero.png',
    images: ['/images/white_gopuram_hero.png'],
    description: '',
    features: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const loadAdminData = async () => {
    try {
      const [tRes, eRes] = await Promise.all([
        fetch('/api/temples'),
        fetch('/api/enquiries')
      ]);
      const tData = await tRes.json();
      const eData = await eRes.json();
      if (tData.success) setTemples(tData.data || []);
      if (eData.success) setEnquiries(eData.data || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        loadAdminData();
      } else {
        setLoginError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setLoginError('Error connecting to login server');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    showToast('Logged out successfully');
  };

  const openNewTempleModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData(initialFormState);
    setShowModal(true);
  };

  const openEditTempleModal = (temple: Temple) => {
    setIsEditing(true);
    setEditingId(temple.id);
    setFormData({
      name: temple.name || '',
      deity: temple.deity || '',
      tradition: temple.tradition || 'Dravida',
      subType: temple.subType || '',
      stoneType: temple.stoneType || '',
      location: temple.location || '',
      country: temple.country || 'India',
      status: temple.status || 'Completed',
      year: temple.year || '2024',
      height: temple.height || '',
      area: temple.area || '',
      coverImage: temple.coverImage || '/images/white_gopuram_hero.png',
      images: temple.images || [temple.coverImage || '/images/white_gopuram_hero.png'],
      description: temple.description || '',
      features: (temple.features || []).join('\n')
    });
    setShowModal(true);
  };

  const handleDeleteTemple = async (id: string) => {
    if (!confirm('Are you sure you want to remove this temple project?')) return;
    try {
      const res = await fetch(`/api/temples/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setTemples(temples.filter((t) => t.id !== id));
        showToast('✅ Temple project deleted successfully!');
      }
    } catch (err) {
      alert('Error deleting temple');
    }
  };

  // Upload file handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean = true) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      });
      const data = await res.json();
      if (data.success && data.url) {
        if (isCover) {
          setFormData((prev) => ({
            ...prev,
            coverImage: data.url,
            images: [data.url, ...prev.images.filter((img) => img !== data.url)]
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, data.url]
          }));
        }
        showToast('Photo uploaded successfully!');
      } else {
        alert(data.message || 'Image upload failed');
      }
    } catch (err) {
      alert('Error uploading file');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveTemple = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        features: formData.features.split('\n').filter((f) => f.trim().length > 0)
      };

      if (isEditing && editingId) {
        const res = await fetch(`/api/temples/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setTemples(temples.map((t) => (t.id === editingId ? data.data : t)));
          setShowModal(false);
          showToast('✅ Temple details updated successfully!');
        } else {
          alert(data.message || 'Failed to update temple');
        }
      } else {
        const res = await fetch('/api/temples', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setTemples([data.data, ...temples]);
          setShowModal(false);
          showToast('✅ New temple published to live portal!');
        } else {
          alert(data.message || 'Failed to save temple');
        }
      }
    } catch (err) {
      alert('Error saving temple');
    }
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(circle at center, #1e2436 0%, #0c0e14 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          color: '#e2e8f0'
        }}
      >
        <div
          style={{
            background: '#181c28',
            border: '1px solid #d4af37',
            borderRadius: '12px',
            padding: '3rem 2.5rem',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.2)',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏛️</div>
          <h2 style={{ color: '#d4af37', fontFamily: 'Marcellus, serif', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
            Temple Admin Portal
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Sign in with email <strong>temple@gmail.com</strong> to manage temples, upload photos & consultation requests.
          </p>

          {loginError && (
            <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', background: 'rgba(239,68,68,0.1)', padding: '0.5rem', borderRadius: '4px' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#d4af37', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                Email Address
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{ width: '100%', background: '#0f121a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0.8rem 1rem', color: '#fff' }}
                required
              />
            </div>
            <div style={{ marginBottom: '1.75rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#d4af37', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{ width: '100%', background: '#0f121a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0.8rem 1rem', color: '#fff' }}
                required
              />
            </div>
            <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '0.85rem' }}>
              Secure Admin Login →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0c0e14', color: '#e2e8f0' }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: '270px', background: '#131620', borderRight: '1px solid rgba(255,255,255,0.08)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <img src="/images/omkar_logo.jpg" alt="Logo" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #d4af37' }} />
          <span style={{ fontFamily: 'Marcellus, serif', fontSize: '1.25rem', color: '#d4af37', fontWeight: 'bold' }}>
            OMKAR ADMIN
          </span>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.85rem 1.15rem',
                background: activeTab === 'dashboard' ? 'rgba(212,175,55,0.12)' : 'transparent',
                border: activeTab === 'dashboard' ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent',
                borderRadius: '8px',
                color: activeTab === 'dashboard' ? '#d4af37' : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              📊 Overview & Stats
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('temples')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.85rem 1.15rem',
                background: activeTab === 'temples' ? 'rgba(212,175,55,0.12)' : 'transparent',
                border: activeTab === 'temples' ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent',
                borderRadius: '8px',
                color: activeTab === 'temples' ? '#d4af37' : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              🏛️ Manage Temples & Photos ({temples.length})
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('enquiries')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.85rem 1.15rem',
                background: activeTab === 'enquiries' ? 'rgba(212,175,55,0.12)' : 'transparent',
                border: activeTab === 'enquiries' ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent',
                borderRadius: '8px',
                color: activeTab === 'enquiries' ? '#d4af37' : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              📬 Enquiries ({enquiries.length})
            </button>
          </li>
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
            Logged in as: <strong style={{ color: '#d4af37' }}>temple@gmail.com</strong>
          </div>
          <Link href="/" target="_blank" style={{ display: 'block', padding: '0.65rem 0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            🌐 View Public Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ef4444',
              padding: '0.65rem 0.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              textAlign: 'left',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, padding: '2.5rem 3rem', overflowY: 'auto', maxHeight: '100vh' }}>
        {/* PANE 1: OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div>
                <h1 style={{ fontSize: '1.9rem', color: '#fff', fontFamily: 'Marcellus, serif' }}>
                  Dashboard Overview
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Real-time temple analytics, photo uploads and incoming consultation requests.
                </p>
              </div>
              <button className="btn btn-gold" onClick={openNewTempleModal}>
                + Upload New Temple & Photos
              </button>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#181c28', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase' }}>Total Temples</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#d4af37', fontFamily: 'Marcellus, serif' }}>
                    {temples.length}
                  </div>
                </div>
                <div style={{ fontSize: '2.2rem', opacity: 0.6 }}>🏛️</div>
              </div>

              <div style={{ background: '#181c28', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase' }}>Enquiries</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981', fontFamily: 'Marcellus, serif' }}>
                    {enquiries.length}
                  </div>
                </div>
                <div style={{ fontSize: '2.2rem', opacity: 0.6 }}>📬</div>
              </div>

              <div style={{ background: '#181c28', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase' }}>States Covered</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#60a5fa', fontFamily: 'Marcellus, serif' }}>
                    22 States
                  </div>
                </div>
                <div style={{ fontSize: '2.2rem', opacity: 0.6 }}>🇮🇳</div>
              </div>
            </div>
          </div>
        )}

        {/* PANE 2: MANAGE TEMPLES & EDIT MORE INFORMATION */}
        {(activeTab === 'temples' || activeTab === 'dashboard') && (
          <div style={{ background: '#181c28', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '2rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', color: '#fff' }}>Temple Masterworks & Photo Gallery Manager</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Upload new site photos, edit specs, stone types, heights, and descriptions.</p>
              </div>
              <button className="btn btn-gold" onClick={openNewTempleModal}>
                + Add New Temple Project
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Preview</th>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Temple Name</th>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Deity</th>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Style / Order</th>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Height & Area</th>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Status</th>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {temples.map((temple) => (
                  <tr key={temple.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>
                      <img
                        src={temple.coverImage}
                        alt={temple.name}
                        style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #d4af37' }}
                      />
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600, color: '#fff' }}>
                      <div>{temple.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{temple.location}</div>
                    </td>
                    <td style={{ padding: '1rem', color: '#d4af37' }}>{temple.deity}</td>
                    <td style={{ padding: '1rem' }}>{temple.tradition}</td>
                    <td style={{ padding: '1rem', color: '#cbd5e1' }}>
                      {temple.height || 'N/A'} · {temple.area || 'N/A'}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.25rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', background: temple.status === 'Completed' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: temple.status === 'Completed' ? '#10b981' : '#f59e0b' }}>
                        {temple.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => openEditTempleModal(temple)}
                          style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid #d4af37', color: '#d4af37', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                        >
                          ✏️ Edit Info
                        </button>
                        <button
                          onClick={() => handleDeleteTemple(temple.id)}
                          style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.4rem 0.75rem', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PANE 3: RECEIVED ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div style={{ background: '#181c28', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '1.5rem' }}>
              Received Consultation & Construction Enquiries ({enquiries.length})
            </h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Applicant</th>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Phone & WhatsApp</th>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Deity / Style</th>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Location / State</th>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Budget Scope</th>
                  <th style={{ padding: '1rem', color: '#94a3b8' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr key={enq.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: '#fff' }}>
                      {enq.name}
                      {enq.email && <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{enq.email}</div>}
                    </td>
                    <td style={{ padding: '1rem', color: '#10b981', fontWeight: 600 }}>
                      <a href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`} target="_blank" style={{ color: '#10b981', textDecoration: 'underline' }}>
                        {enq.phone}
                      </a>
                    </td>
                    <td style={{ padding: '1rem' }}>{enq.deity} ({enq.tradition})</td>
                    <td style={{ padding: '1rem' }}>{enq.location}, {enq.state}</td>
                    <td style={{ padding: '1rem', color: '#d4af37' }}>{enq.budget}</td>
                    <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                      {new Date(enq.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* ADD / EDIT TEMPLE & UPLOAD PHOTOS MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '2rem' }}>
          <div style={{ background: '#181c28', border: '2px solid #d4af37', borderRadius: '12px', padding: '2.5rem', width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#d4af37', fontSize: '1.5rem', fontFamily: 'Marcellus, serif' }}>
                {isEditing ? '✏️ Edit Temple Project & Gallery Photos' : '+ Upload New Temple Project'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleSaveTemple}>
              {/* Photo Upload Section */}
              <div style={{ background: '#0f121a', border: '1px dashed #d4af37', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <label style={{ display: 'block', color: '#d4af37', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                  Upload Project Cover Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  style={{ color: '#94a3b8', fontSize: '0.9rem' }}
                />
                {uploadingImage && <div style={{ color: '#d4af37', marginTop: '0.5rem', fontSize: '0.85rem' }}>Uploading photo...</div>}
                
                {formData.coverImage && (
                  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    <img
                      src={formData.coverImage}
                      alt="Cover Preview"
                      style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #d4af37' }}
                    />
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Cover image URL: {formData.coverImage}</span>
                  </div>
                )}
              </div>

              {/* Basic Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#d4af37', fontSize: '0.8rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Temple Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', background: '#0f121a', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem', color: '#fff', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#d4af37', fontSize: '0.8rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Presiding Deity *</label>
                  <input
                    type="text"
                    required
                    value={formData.deity}
                    onChange={(e) => setFormData({ ...formData, deity: e.target.value })}
                    style={{ width: '100%', background: '#0f121a', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem', color: '#fff', borderRadius: '4px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#d4af37', fontSize: '0.8rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Style / Order</label>
                  <select
                    value={formData.tradition}
                    onChange={(e) => setFormData({ ...formData, tradition: e.target.value })}
                    style={{ width: '100%', background: '#0f121a', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem', color: '#fff', borderRadius: '4px' }}
                  >
                    <option value="Dravida">Dravida (South Vimana / Rajagopuram)</option>
                    <option value="Nagara">Nagara (North Curvilinear Spire)</option>
                    <option value="Vesara">Vesara (Stellate Star Plan)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#d4af37', fontSize: '0.8rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Stone Material Type</label>
                  <input
                    type="text"
                    value={formData.stoneType}
                    placeholder="e.g. Makrana White Marble / Pink Sandstone"
                    onChange={(e) => setFormData({ ...formData, stoneType: e.target.value })}
                    style={{ width: '100%', background: '#0f121a', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem', color: '#fff', borderRadius: '4px' }}
                  />
                </div>
              </div>

              {/* Dimensions & Location */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#d4af37', fontSize: '0.8rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Tower Height</label>
                  <input
                    type="text"
                    value={formData.height}
                    placeholder="e.g. 128 ft / 7 Tiers"
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    style={{ width: '100%', background: '#0f121a', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem', color: '#fff', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#d4af37', fontSize: '0.8rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Built-Up Mandapa Area</label>
                  <input
                    type="text"
                    value={formData.area}
                    placeholder="e.g. 55,000 sq.ft"
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    style={{ width: '100%', background: '#0f121a', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem', color: '#fff', borderRadius: '4px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#d4af37', fontSize: '0.8rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Location / State</label>
                  <input
                    type="text"
                    value={formData.location}
                    placeholder="e.g. Balewadi, Pune / Saurashtra Coast"
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{ width: '100%', background: '#0f121a', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem', color: '#fff', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#d4af37', fontSize: '0.8rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', background: '#0f121a', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem', color: '#fff', borderRadius: '4px' }}
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress / Active Civil Work</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#d4af37', fontSize: '0.8rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Architectural Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', background: '#0f121a', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem', color: '#fff', borderRadius: '4px' }}
                ></textarea>
              </div>

              {/* Features */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#d4af37', fontSize: '0.8rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Shastra Highlights / Features (1 per line)</label>
                <textarea
                  rows={3}
                  value={formData.features}
                  placeholder="81-Cell Paramasayika Vastupurusha Mandala core alignment&#10;Monolithic Granite Pillars&#10;Dry-fit assembled at Pune karkhana"
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  style={{ width: '100%', background: '#0f121a', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem', color: '#fff', borderRadius: '4px' }}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '0.9rem' }}>
                {isEditing ? 'Save Changes & Update Portal →' : 'Publish Temple to Live Website →'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#1e2436', border: '1px solid #d4af37', color: '#fff', padding: '1rem 1.75rem', borderRadius: '8px', zIndex: 999999 }}>
          {toastMsg}
        </div>
      )}
    </div>
  );
}
