import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];

  // Check if the request is for a protected route
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      // Redirect to login if no token is found
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify the token
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);
      // Proceed to the requested page
      return NextResponse.next();
    } catch (err) {
      // Token is invalid or expired; redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to proceed if it's not a protected route
  return NextResponse.next();
}