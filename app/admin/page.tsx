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
        fetch('/api/temples?t=' + Date.now(), { cache: 'no-store' }),
        fetch('/api/enquiries?t=' + Date.now(), { cache: 'no-store' })
      ]);
      const tData = await tRes.json();
      const eData = await eRes.json();
      if (tData.success) setTemples(tData.data || []);
      if (eData.success) setEnquiries(eData.data || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [activeTab, isAuthenticated]);

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
          background: 'var(--bg-main)',
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(198, 162, 74, 0.12) 0%, transparent 40%),
                            radial-gradient(circle at 90% 80%, rgba(184, 92, 36, 0.10) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(245, 239, 227, 0.96) 0%, var(--bg-main) 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          color: 'var(--text-main)',
          fontFamily: 'var(--font-body)'
        }}
      >
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1.5px solid var(--gold-primary)',
            borderRadius: '16px',
            padding: '3.5rem 2.75rem',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 20px 45px -10px rgba(41, 28, 20, 0.15), 0 0 30px rgba(198, 162, 74, 0.2)',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img
              src="/images/omkar_logo.jpg"
              alt="Omkar Temple Construction"
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                border: '2.5px solid var(--gold-primary)',
                boxShadow: '0 0 20px var(--gold-glow)'
              }}
            />
          </div>
          
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '0.4rem' }}>
            Temple Architecture Management
          </div>
          <h2 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>
            Omkar Admin Portal
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
            Sign in to manage temple masterworks, upload site photography, and review consultation enquiries.
          </p>

          {loginError && (
            <div
              style={{
                color: 'var(--maroon)',
                fontSize: '0.9rem',
                marginBottom: '1.25rem',
                background: 'rgba(100, 31, 31, 0.08)',
                border: '1px solid rgba(100, 31, 31, 0.25)',
                padding: '0.75rem',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label
                style={{
                  display: 'block',
                  color: 'var(--saffron)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.4rem'
                }}
              >
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-paper)',
                  border: '1.5px solid var(--border-stone)',
                  padding: '0.85rem 1rem',
                  color: 'var(--text-main)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.25s ease'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label
                style={{
                  display: 'block',
                  color: 'var(--saffron)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.4rem'
                }}
              >
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-paper)',
                  border: '1.5px solid var(--border-stone)',
                  padding: '0.85rem 1rem',
                  color: 'var(--text-main)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.25s ease'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-gold"
              style={{
                width: '100%',
                padding: '0.95rem',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              Sign In To Temple Portal →
            </button>
          </form>

          <div style={{ marginTop: '1.75rem', borderTop: '1px solid var(--border-stone)', paddingTop: '1.25rem' }}>
            <Link
              href="/"
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-main)',
        color: 'var(--text-main)',
        fontFamily: 'var(--font-body)'
      }}
    >
      {/* Sidebar Navigation */}
      <aside
        style={{
          width: '290px',
          background: 'var(--bg-paper)',
          borderRight: '1.5px solid var(--border-gold)',
          padding: '2.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          boxShadow: '4px 0 20px rgba(41, 28, 20, 0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '2.5rem', paddingLeft: '0.35rem' }}>
          <img
            src="/images/omkar_logo.jpg"
            alt="Logo"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              border: '2px solid var(--gold-primary)',
              boxShadow: '0 0 10px var(--gold-glow)'
            }}
          />
          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                color: 'var(--text-main)',
                fontWeight: 'bold',
                display: 'block',
                lineHeight: 1.1
              }}
            >
              OMKAR
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--saffron)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}
            >
              Admin System
            </span>
          </div>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0, margin: 0 }}>
          <li>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.9rem 1.15rem',
                background: activeTab === 'dashboard' ? 'linear-gradient(135deg, rgba(198,162,74,0.18) 0%, rgba(184,92,36,0.12) 100%)' : 'transparent',
                border: activeTab === 'dashboard' ? '1.5px solid var(--gold-primary)' : '1.5px solid transparent',
                borderRadius: '8px',
                color: activeTab === 'dashboard' ? 'var(--maroon)' : 'var(--text-muted)',
                fontWeight: activeTab === 'dashboard' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                transition: 'var(--transition-smooth)'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>📊</span> Overview & Stats
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
                padding: '0.9rem 1.15rem',
                background: activeTab === 'temples' ? 'linear-gradient(135deg, rgba(198,162,74,0.18) 0%, rgba(184,92,36,0.12) 100%)' : 'transparent',
                border: activeTab === 'temples' ? '1.5px solid var(--gold-primary)' : '1.5px solid transparent',
                borderRadius: '8px',
                color: activeTab === 'temples' ? 'var(--maroon)' : 'var(--text-muted)',
                fontWeight: activeTab === 'temples' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                transition: 'var(--transition-smooth)'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🏛️</span> Manage Temples ({temples.length})
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
                padding: '0.9rem 1.15rem',
                background: activeTab === 'enquiries' ? 'linear-gradient(135deg, rgba(198,162,74,0.18) 0%, rgba(184,92,36,0.12) 100%)' : 'transparent',
                border: activeTab === 'enquiries' ? '1.5px solid var(--gold-primary)' : '1.5px solid transparent',
                borderRadius: '8px',
                color: activeTab === 'enquiries' ? 'var(--maroon)' : 'var(--text-muted)',
                fontWeight: activeTab === 'enquiries' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                transition: 'var(--transition-smooth)'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>📬</span> Enquiries ({enquiries.length})
            </button>
          </li>
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '1.75rem', borderTop: '1px solid var(--border-stone)' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem', paddingLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
            Logged in: <strong style={{ color: 'var(--saffron)' }}>temple@gmail.com</strong>
          </div>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 0.75rem',
              color: 'var(--text-main)',
              fontSize: '0.92rem',
              borderRadius: '6px',
              textDecoration: 'none',
              marginBottom: '0.5rem',
              background: 'rgba(198,162,74,0.08)',
              border: '1px solid var(--border-gold)'
            }}
          >
            🌐 View Public Website →
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid rgba(100, 31, 31, 0.2)',
              borderRadius: '6px',
              color: 'var(--maroon)',
              padding: '0.65rem 0.75rem',
              cursor: 'pointer',
              fontSize: '0.92rem',
              textAlign: 'left',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(100, 31, 31, 0.08)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, padding: '2.75rem 3.5rem', overflowY: 'auto', maxHeight: '100vh' }}>
        {/* PANE 1: OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div>
                <div className="eyebrow">Administrative Overview</div>
                <h1 style={{ fontSize: '2.2rem', color: 'var(--text-main)', fontFamily: 'var(--font-heading)', margin: 0 }}>
                  Temple Portfolio & Consultation Portal
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.4rem' }}>
                  Real-time project analytics, site photography updates and incoming temple construction enquiries.
                </p>
              </div>
              <button className="btn btn-gold" onClick={openNewTempleModal}>
                + Upload New Temple & Photos
              </button>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem', marginBottom: '3rem' }}>
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border-gold)',
                  borderRadius: '12px',
                  padding: '1.75rem 2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 8px 24px rgba(41, 28, 20, 0.06)'
                }}
              >
                <div>
                  <div className="stat-label" style={{ color: 'var(--saffron)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    Total Temples In Portfolio
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--maroon)', fontFamily: 'var(--font-heading)' }}>
                    {temples.length}
                  </div>
                </div>
                <div style={{ fontSize: '2.75rem', opacity: 0.85 }}>🏛️</div>
              </div>

              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border-gold)',
                  borderRadius: '12px',
                  padding: '1.75rem 2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 8px 24px rgba(41, 28, 20, 0.06)'
                }}
              >
                <div>
                  <div className="stat-label" style={{ color: 'var(--saffron)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    Consultation Requests
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold-deep)', fontFamily: 'var(--font-heading)' }}>
                    {enquiries.length}
                  </div>
                </div>
                <div style={{ fontSize: '2.75rem', opacity: 0.85 }}>📬</div>
              </div>

              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border-gold)',
                  borderRadius: '12px',
                  padding: '1.75rem 2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 8px 24px rgba(41, 28, 20, 0.06)'
                }}
              >
                <div>
                  <div className="stat-label" style={{ color: 'var(--saffron)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    Traditions Supported
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                    3 <span style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-muted)' }}>(Dravida · Nagara · Vesara)</span>
                  </div>
                </div>
                <div style={{ fontSize: '2.75rem', opacity: 0.85 }}>🕉️</div>
              </div>
            </div>
          </div>
        )}

        {/* PANE 2: MANAGE TEMPLES & EDIT MORE INFORMATION */}
        {(activeTab === 'temples' || activeTab === 'dashboard') && (
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border-gold)',
              borderRadius: '14px',
              padding: '2.25rem',
              marginBottom: '2.5rem',
              boxShadow: '0 10px 30px rgba(41, 28, 20, 0.06)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
              <div>
                <div className="eyebrow">Portfolio Masterworks</div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontFamily: 'var(--font-heading)', margin: 0 }}>
                  Temple Projects & Photography Gallery
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.3rem' }}>
                  Manage temple details, high-res site photography, architectural dimensions, and stone materials.
                </p>
              </div>
              <button className="btn btn-gold" onClick={openNewTempleModal}>
                + Add New Temple Project
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-paper)', borderBottom: '2px solid var(--border-gold)' }}>
                    <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Photo</th>
                    <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Temple & Location</th>
                    <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deity</th>
                    <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Style / Order</th>
                    <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Height & Area</th>
                    <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                    <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {temples.map((temple) => (
                    <tr key={temple.id} style={{ borderBottom: '1px solid var(--border-stone)', transition: 'background 0.2s ease' }}>
                      <td style={{ padding: '1rem' }}>
                        <img
                          src={temple.coverImage}
                          alt={temple.name}
                          style={{ width: '68px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1.5px solid var(--gold-primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                        />
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-main)' }}>
                        <div style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>{temple.name}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.15rem' }}>
                          📍 {temple.location}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--saffron)', fontWeight: 600 }}>{temple.deity}</td>
                      <td style={{ padding: '1rem' }}>
                        <span
                          style={{
                            background: 'rgba(198, 162, 74, 0.15)',
                            border: '1px solid var(--border-gold)',
                            color: 'var(--maroon)',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '4px',
                            fontSize: '0.82rem',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {temple.tradition}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        {temple.height || '—'} · {temple.area || '—'}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span
                          style={{
                            padding: '0.28rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.78rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 600,
                            background: temple.status === 'Completed' ? 'rgba(37, 211, 102, 0.12)' : 'rgba(184, 92, 36, 0.12)',
                            color: temple.status === 'Completed' ? '#128C7E' : 'var(--saffron)',
                            border: temple.status === 'Completed' ? '1px solid rgba(37, 211, 102, 0.3)' : '1px solid var(--border-gold)'
                          }}
                        >
                          {temple.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => openEditTempleModal(temple)}
                            className="btn btn-outline-gold"
                            style={{
                              padding: '0.45rem 0.85rem',
                              fontSize: '0.78rem'
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTemple(temple.id)}
                            style={{
                              background: 'rgba(100, 31, 31, 0.08)',
                              border: '1px solid rgba(100, 31, 31, 0.3)',
                              color: 'var(--maroon)',
                              padding: '0.45rem 0.85rem',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.78rem',
                              fontWeight: 600
                            }}
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
          </div>
        )}

        {/* PANE 3: RECEIVED ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border-gold)',
              borderRadius: '14px',
              padding: '2.25rem',
              boxShadow: '0 10px 30px rgba(41, 28, 20, 0.06)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
              <div>
                <div className="eyebrow">Client Communications</div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontFamily: 'var(--font-heading)', margin: 0 }}>
                  Received Consultation & Construction Enquiries ({enquiries.length})
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.3rem' }}>
                  Direct bookings submitted by temple trusts, patrons, and building committees.
                </p>
              </div>
              <button
                onClick={loadAdminData}
                className="btn btn-outline-gold"
                style={{ padding: '0.55rem 1.15rem' }}
              >
                🔄 Refresh Enquiries
              </button>
            </div>

            {enquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📬</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-main)', marginBottom: '0.5rem' }}>No enquiries received yet</h3>
                <p>As soon as a devotee or committee fills the booking form, it will appear here immediately.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-paper)', borderBottom: '2px solid var(--border-gold)' }}>
                      <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Applicant & Message</th>
                      <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Contact & WhatsApp</th>
                      <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Deity / Style</th>
                      <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Location</th>
                      <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Scope / Budget</th>
                      <th style={{ padding: '1rem', color: 'var(--maroon)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq.id} style={{ borderBottom: '1px solid var(--border-stone)' }}>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{enq.name}</div>
                          {enq.email && <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{enq.email}</div>}
                          {enq.message && (
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem', fontStyle: 'italic', background: 'var(--bg-paper)', padding: '0.4rem 0.65rem', borderRadius: '4px', borderLeft: '3px solid var(--gold-primary)' }}>
                              &quot;{enq.message}&quot;
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <a
                            href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            style={{
                              color: '#128C7E',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              background: 'rgba(37, 211, 102, 0.1)',
                              padding: '0.35rem 0.75rem',
                              borderRadius: '20px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.85rem'
                            }}
                          >
                            💬 {enq.phone}
                          </a>
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--saffron)', fontWeight: 600 }}>
                          {enq.deity} <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 400 }}>({enq.tradition})</span>
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--text-main)' }}>{enq.location || 'Pan-India'}</td>
                        <td style={{ padding: '1rem', color: 'var(--maroon)', fontWeight: 600, fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}>
                          {enq.budget || 'Custom Scope'}
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                          {new Date(enq.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ADD / EDIT TEMPLE & UPLOAD PHOTOS MODAL */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(33, 24, 19, 0.75)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '2rem'
          }}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '2px solid var(--gold-primary)',
              borderRadius: '16px',
              padding: '2.75rem',
              width: '100%',
              maxWidth: '780px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', borderBottom: '1px solid var(--border-gold)', paddingBottom: '1rem' }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Temple Architect Editor</div>
                <h2 style={{ color: 'var(--text-main)', fontSize: '1.7rem', fontFamily: 'var(--font-heading)', margin: 0 }}>
                  {isEditing ? '✏️ Edit Temple Project & Gallery Photos' : '+ Upload New Temple Project'}
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'var(--bg-paper)',
                  border: '1px solid var(--border-stone)',
                  color: 'var(--text-main)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTemple}>
              {/* Photo Upload Section */}
              <div
                style={{
                  background: 'var(--bg-paper)',
                  border: '2px dashed var(--gold-primary)',
                  borderRadius: '10px',
                  padding: '1.5rem',
                  marginBottom: '1.75rem',
                  textAlign: 'center'
                }}
              >
                <label
                  style={{
                    display: 'block',
                    color: 'var(--maroon)',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  📸 Upload Project Cover Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}
                />
                {uploadingImage && (
                  <div style={{ color: 'var(--saffron)', marginTop: '0.5rem', fontSize: '0.88rem', fontFamily: 'var(--font-mono)' }}>
                    ⏳ Uploading temple image...
                  </div>
                )}

                {formData.coverImage && (
                  <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
                    <img
                      src={formData.coverImage}
                      alt="Cover Preview"
                      style={{
                        width: '130px',
                        height: '90px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '2px solid var(--gold-primary)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
                        Image Path:
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--saffron)', fontWeight: 600, wordBreak: 'break-all' }}>
                        {formData.coverImage}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Basic Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Temple Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-paper)', border: '1.5px solid var(--border-stone)', padding: '0.8rem', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Presiding Deity *</label>
                  <input
                    type="text"
                    required
                    value={formData.deity}
                    onChange={(e) => setFormData({ ...formData, deity: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-paper)', border: '1.5px solid var(--border-stone)', padding: '0.8rem', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Style / Architectural Order</label>
                  <select
                    value={formData.tradition}
                    onChange={(e) => setFormData({ ...formData, tradition: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-paper)', border: '1.5px solid var(--border-stone)', padding: '0.8rem', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.95rem' }}
                  >
                    <option value="Dravida">Dravida (South Vimana / Rajagopuram)</option>
                    <option value="Nagara">Nagara (North Curvilinear Spire)</option>
                    <option value="Vesara">Vesara (Stellate Star Plan)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Stone Material Type</label>
                  <input
                    type="text"
                    value={formData.stoneType}
                    placeholder="e.g. Makrana White Marble / Pink Sandstone"
                    onChange={(e) => setFormData({ ...formData, stoneType: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-paper)', border: '1.5px solid var(--border-stone)', padding: '0.8rem', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>
              </div>

              {/* Dimensions & Location */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Tower Height</label>
                  <input
                    type="text"
                    value={formData.height}
                    placeholder="e.g. 128 ft / 7 Tiers"
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-paper)', border: '1.5px solid var(--border-stone)', padding: '0.8rem', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Built-Up Mandapa Area</label>
                  <input
                    type="text"
                    value={formData.area}
                    placeholder="e.g. 55,000 sq.ft"
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-paper)', border: '1.5px solid var(--border-stone)', padding: '0.8rem', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Location (City / State)</label>
                  <input
                    type="text"
                    value={formData.location}
                    placeholder="e.g. Balewadi, Pune / Somnath"
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-paper)', border: '1.5px solid var(--border-stone)', padding: '0.8rem', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-paper)', border: '1.5px solid var(--border-stone)', padding: '0.8rem', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.95rem' }}
                  >
                    <option value="Completed">Completed / Consecrated</option>
                    <option value="In Progress">In Progress / Active Civil Work</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Architectural Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', background: 'var(--bg-paper)', border: '1.5px solid var(--border-stone)', padding: '0.8rem', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}
                ></textarea>
              </div>

              {/* Features */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Shastra Highlights / Features (1 per line)</label>
                <textarea
                  rows={3}
                  value={formData.features}
                  placeholder="81-Cell Paramasayika Vastupurusha Mandala core alignment&#10;Monolithic Granite Pillars&#10;Dry-fit assembled at Pune karkhana"
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  style={{ width: '100%', background: 'var(--bg-paper)', border: '1.5px solid var(--border-stone)', padding: '0.8rem', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
                {isEditing ? 'Save Changes & Update Portal →' : 'Publish Temple to Live Website →'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: '2.5rem',
            right: '2.5rem',
            background: 'var(--bg-card)',
            border: '2px solid var(--gold-primary)',
            color: 'var(--maroon)',
            fontWeight: 600,
            padding: '1.1rem 2rem',
            borderRadius: '10px',
            boxShadow: '0 12px 35px rgba(41, 28, 20, 0.18)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
