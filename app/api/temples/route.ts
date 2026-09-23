import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { Temple } from '@/lib/types';

export async function GET(request: NextRequest) {
  const db = readDb();
  let list = db.temples || [];

  const { searchParams } = new URL(request.url);
  const tradition = searchParams.get('tradition');
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  if (tradition && tradition !== 'All') {
    list = list.filter((t) => t.tradition.toLowerCase() === tradition.toLowerCase());
  }
  if (status && status !== 'All') {
    list = list.filter((t) => t.status.toLowerCase() === status.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.deity.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.stoneType.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ success: true, count: list.length, data: list });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = readDb();

    const newTemple: Temple = {
      id: 'temple-' + Date.now(),
      name: body.name || 'Untitled Mandir',
      deity: body.deity || 'Presiding Deity',
      tradition: body.tradition || 'Dravida',
      subType: body.subType || '',
      stoneType: body.stoneType || 'Granite',
      location: body.location || 'India',
      country: body.country || 'India',
      status: body.status || 'Completed',
      year: body.year || new Date().getFullYear().toString(),
      height: body.height || '',
      area: body.area || '',
      coverImage: body.coverImage || '/images/white_gopuram_hero.png',
      images: body.images || ['/images/white_gopuram_hero.png'],
      description: body.description || '',
      features: body.features || [],
      likes: 0,
      featured: body.featured || false,
      createdAt: new Date().toISOString()
    };

    if (!db.temples) db.temples = [];
    db.temples.unshift(newTemple);
    writeDb(db);

    return NextResponse.json({ success: true, data: newTemple });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to create temple' }, { status: 500 });
  }
}
