import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  cookies().set('cookieName', 'cookieValue', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'none',
    path: '/',
  });

  return NextResponse.json({ message: 'Cookie set' }, { status: 200 });
}