import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { uploadToImageKit } from '@/lib/imagekit';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteProps) {
  const { id } = await params;
  const db = readDb();
  const temple = (db.temples || []).find((t) => t.id === id);
  if (!temple) {
    return NextResponse.json({ success: false, message: 'Temple not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: temple });
}

export async function PUT(request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    const db = readDb();
    const index = (db.temples || []).findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Temple not found' }, { status: 404 });
    }

    const contentType = request.headers.get('content-type') || '';
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

          let savedUrl = await uploadToImageKit(buffer, filename);

          if (!savedUrl) {
            try {
              const uploadDir = path.join(process.cwd(), 'public', 'uploads');
              if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
              }
              fs.writeFileSync(path.join(uploadDir, filename), buffer);
              savedUrl = `/uploads/${filename}`;
            } catch (e) {
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

    const current = db.temples[index];
    const finalCover = imageUrls[0] || body.coverImage || current.coverImage;
    const finalImages = imageUrls.length > 0 ? [...imageUrls, ...(current.images || [])] : (current.images || [finalCover]);

    const featuresList = typeof body.features === 'string'
      ? body.features.split('\n').map((s: string) => s.trim()).filter(Boolean)
      : (Array.isArray(body.features) ? body.features : current.features);

    db.temples[index] = {
      ...current,
      name: body.name ?? current.name,
      deity: body.deity ?? current.deity,
      tradition: body.tradition ?? current.tradition,
      subType: body.subType ?? current.subType,
      stoneType: body.stoneType ?? current.stoneType,
      location: body.location ?? current.location,
      country: body.country ?? current.country,
      status: body.status ?? current.status,
      year: body.year ?? current.year,
      height: body.height ?? current.height,
      area: body.area ?? current.area,
      coverImage: finalCover,
      images: finalImages,
      description: body.description ?? current.description,
      features: featuresList,
      featured: body.featured !== undefined ? (body.featured === 'on' || body.featured === true || body.featured === 'true') : current.featured
    };

    writeDb(db);
    return NextResponse.json({
      success: true,
      message: 'Temple updated successfully!',
      data: db.temples[index]
    });
  } catch (err: any) {
    console.error('Error updating temple:', err);
    return NextResponse.json({ success: false, message: err?.message || 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    const db = readDb();
    const index = (db.temples || []).findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Temple not found' }, { status: 404 });
    }

    db.temples.splice(index, 1);
    writeDb(db);
    return NextResponse.json({ success: true, message: 'Temple removed successfully' });
  } catch (err: any) {
    console.error('Error deleting temple:', err);
    return NextResponse.json({ success: false, message: err?.message || 'Delete failed' }, { status: 500 });
  }
}
