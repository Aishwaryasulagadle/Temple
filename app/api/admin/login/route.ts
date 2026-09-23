import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (username === 'admin' && password === 'templeadmin123') {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: { username: 'admin', role: 'Chief Sthapati Admin' }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid admin username or password' },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
