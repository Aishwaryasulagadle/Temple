import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { Enquiry } from '@/lib/types';

export async function GET() {
  const db = readDb();
  return NextResponse.json({ success: true, data: db.enquiries || [] });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, deity, tradition, state, location, budget, landArea, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Name and phone number are required.' },
        { status: 400 }
      );
    }

    const db = readDb();
    const newEnquiry: Enquiry = {
      id: 'enq-' + Date.now(),
      name,
      email: email || '',
      phone,
      deity: deity || 'Not specified',
      tradition: tradition || 'Not decided',
      state: state || 'Pan-India',
      location: location || '',
      budget: budget || '',
      landArea: landArea || '',
      message: message || '',
      date: new Date().toISOString()
    };

    if (!db.enquiries) db.enquiries = [];
    db.enquiries.unshift(newEnquiry);
    writeDb(db);

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: newEnquiry
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}
