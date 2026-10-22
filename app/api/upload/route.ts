import { NextRequest, NextResponse } from 'next/server';
import { uploadToImageKit } from '@/lib/imagekit';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || 'image/jpeg';
    const ext = path.extname(file.name) || '.jpg';
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `temple_${Date.now()}_${cleanName.substring(0, 20)}${ext}`;

    // 1. Try ImageKit Cloud CDN First
    const imageKitUrl = await uploadToImageKit(buffer, filename);
    if (imageKitUrl) {
      return NextResponse.json({
        success: true,
        url: imageKitUrl,
        storage: 'imagekit',
        message: 'Photo uploaded to ImageKit CDN successfully'
      });
    }

    // 2. Try saving locally in public/uploads (local development fallback)
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${filename}`;
      return NextResponse.json({ 
        success: true, 
        url: publicUrl, 
        storage: 'local',
        message: 'Photo uploaded locally' 
      });
    } catch (fsErr: any) {
      // 3. Fallback to embedded Base64 data URI
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${mimeType};base64,${base64}`;

      return NextResponse.json({ 
        success: true, 
        url: dataUrl, 
        storage: 'base64',
        message: 'Photo embedded as Base64 successfully' 
      });
    }
  } catch (err: any) {
    console.error('Upload processing error:', err);
    return NextResponse.json({ 
      success: false, 
      message: err?.message || 'File upload failed' 
    }, { status: 500 });
  }
}
