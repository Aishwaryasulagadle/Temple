import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { Temple } from '@/lib/types';
import { uploadToImageKit } from '@/lib/imagekit';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const db = readDb();
  return NextResponse.json({ success: true, data: db.temples || [] });
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const db = readDb();
    let body: any = {};
    let imageUrls: string[] = [];

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());

      const files = formData.getAll('photos') as (File | string)[];
      for (const item of files) {
        if (typeof item !== 'string' && item.size > 0) {
          const bytes = await item.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const mimeType = item.type || 'image/jpeg';
          const ext = path.extname(item.name) || '.jpg';
          const filename = `temple_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;

          // Try ImageKit first
          let savedUrl = await uploadToImageKit(buffer, filename);

          if (!savedUrl) {
            // Local fallback
            try {
              const uploadDir = path.join(process.cwd(), 'public', 'uploads');
              if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
              }
              fs.writeFileSync(path.join(uploadDir, filename), buffer);
              savedUrl = `/uploads/${filename}`;
            } catch (e) {
              // Base64 fallback
              savedUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
            }
          }

          if (savedUrl) imageUrls.push(savedUrl);
        }
      }
    } else {
      body = await request.json();
      if (body.images && Array.isArray(body.images)) {
        imageUrls = body.images;
      }
    }

    const cover = imageUrls[0] || body.coverImage || '/images/white_gopuram_hero.png';
    const featuresList = typeof body.features === 'string'
      ? body.features.split('\n').map((s: string) => s.trim()).filter(Boolean)
      : (Array.isArray(body.features) ? body.features : []);

    const newTemple: Temple = {
      id: 'temple-' + Date.now(),
      name: body.name || 'Untitled Temple',
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
      coverImage: cover,
      images: imageUrls.length > 0 ? imageUrls : [cover],
      description: body.description || '',
      features: featuresList,
      likes: 0,
      featured: body.featured === 'on' || body.featured === true || body.featured === 'true',
      createdAt: new Date().toISOString()
    };

    if (!db.temples) db.temples = [];
    db.temples.unshift(newTemple);
    writeDb(db);

    return NextResponse.json({
      success: true,
      message: 'Temple uploaded & published successfully!',
      data: newTemple
    });
  } catch (err: any) {
    console.error('Error saving temple:', err);
    return NextResponse.json({
      success: false,
      message: err?.message || 'Failed to save temple'
    }, { status: 500 });
  }
}
