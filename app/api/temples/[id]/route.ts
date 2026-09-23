import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = readDb();
  const temple = (db.temples || []).find((t) => t.id === id);

  if (!temple) {
    return NextResponse.json({ success: false, message: 'Temple not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: temple });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = readDb();
  const index = (db.temples || []).findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ success: false, message: 'Temple not found' }, { status: 404 });
  }

  db.temples.splice(index, 1);
  writeDb(db);

  return NextResponse.json({ success: true, message: 'Temple deleted successfully' });
}
