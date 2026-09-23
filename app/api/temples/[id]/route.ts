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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = readDb();
    const index = (db.temples || []).findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Temple not found' }, { status: 404 });
    }

    // Merge updated information
    db.temples[index] = {
      ...db.temples[index],
      ...body,
      id: db.temples[index].id, // preserve ID
      updatedAt: new Date().toISOString()
    };

    writeDb(db);

    return NextResponse.json({
      success: true,
      message: 'Temple details updated successfully',
      data: db.temples[index]
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to update temple' }, { status: 500 });
  }
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
