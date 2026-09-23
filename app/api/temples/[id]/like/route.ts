import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = readDb();
  const index = (db.temples || []).findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ success: false, message: 'Temple not found' }, { status: 404 });
  }

  db.temples[index].likes = (db.temples[index].likes || 0) + 1;
  writeDb(db);

  return NextResponse.json({ success: true, likes: db.temples[index].likes });
}
