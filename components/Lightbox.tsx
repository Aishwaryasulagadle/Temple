'use client';

import React from 'react';

interface LightboxProps {
  isOpen: boolean;
  imgSrc: string;
  title: string;
  desc: string;
  onClose: () => void;
}

export default function Lightbox({ isOpen, imgSrc, title, desc, onClose }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <div className="lightbox-modal active" onClick={onClose}>
      <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close-btn" onClick={onClose}>
          ✕
        </button>
        <div className="lightbox-img-area">
          <img src={imgSrc} alt={title} />
        </div>
        <div className="lightbox-caption-area">
          <div>
            <h4 style={{ color: 'var(--gold-light)', fontSize: '1.25rem', marginBottom: '0.35rem' }}>
              {title}
            </h4>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              {desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
