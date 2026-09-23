'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Temple } from '@/lib/types';

interface TempleCardProps {
  temple: Temple;
  onLike?: (id: string, newLikes: number) => void;
}

export default function TempleCard({ temple, onLike }: TempleCardProps) {
  const [likes, setLikes] = useState(temple.likes || 0);
  const [liked, setLiked] = useState(false);
  const isCompleted = temple.status === 'Completed';
  const badgeClass = isCompleted ? 'badge-completed' : 'badge-progress';

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch(`/api/temples/${temple.id}/like`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setLikes(data.likes);
        setLiked(true);
        if (onLike) onLike(temple.id, data.likes);
      }
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  return (
    <article className="temple-card">
      <div className="temple-card-media">
        <img src={temple.coverImage || '/images/somnath_grand.png'} alt={temple.name} loading="lazy" />
        <span className={`temple-status-badge ${badgeClass}`}>{temple.status}</span>
        <button
          className={`temple-like-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
          title="Like this temple"
        >
          ❤️
        </button>
      </div>
      <div className="temple-card-body">
        <div className="temple-deity">
          {temple.deity} · <span style={{ color: 'var(--text-muted)' }}>{temple.tradition} Style</span>
        </div>
        <h3>
          <Link href={`/temple/${temple.id}`}>{temple.name}</Link>
        </h3>
        <div className="temple-location">
          <span>📍</span> {temple.location || 'India'}
        </div>
        <p className="temple-snippet">{(temple.description || '').substring(0, 130)}...</p>
        <div className="temple-card-footer">
          <div className="temple-likes-count">
            <span>✨</span> <span>{likes}</span> Blessings & Likes
          </div>
          <Link
            href={`/temple/${temple.id}`}
            className="btn btn-outline-gold"
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.78rem' }}
          >
            Explore Work →
          </Link>
        </div>
      </div>
    </article>
  );
}
