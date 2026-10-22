import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json();
    const userIdentifier = (email || username || '').trim().toLowerCase();

    // Authenticate with email temple@gmail.com, admin, or laxmanpawar1227@gmail.com and password pawar1991
    const isEmailValid = 
      userIdentifier === 'temple@gmail.com' || 
      userIdentifier === 'admin' || 
      userIdentifier === 'pawar' ||
      userIdentifier === 'laxmanpawar1227@gmail.com';

    const isPasswordValid = password === 'pawar1991' || password === 'templeadmin123' || password === 'temple123';

    if (isEmailValid && isPasswordValid) {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: { email: userIdentifier || 'temple@gmail.com', role: 'Chief Sthapati Admin' }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials. Please enter the correct admin password.' },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
