import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json();
    const userIdentifier = (email || username || '').trim().toLowerCase();

    // Authenticate with email temple@gmail.com (or admin) and password temple123
    const isEmailValid = userIdentifier === 'temple@gmail.com' || userIdentifier === 'admin';
    const isPasswordValid = password === 'temple123' || password === 'templeadmin123';

    if (isEmailValid && isPasswordValid) {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: { email: 'temple@gmail.com', role: 'Chief Sthapati Admin' }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid email or password. Please use temple@gmail.com' },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
