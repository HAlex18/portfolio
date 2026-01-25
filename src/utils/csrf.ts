import { NextRequest, NextResponse } from 'next/server';

/**
 * Validate Origin header for CSRF protection.
 * Returns null if valid, or an error response if invalid.
 */
export function validateOrigin(request: NextRequest): NextResponse | null {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

  // Allow requests without Origin header (same-origin requests from some browsers)
  if (!origin) {
    return null;
  }

  // Build allowed origins list
  const allowedOrigins: string[] = [];

  // Add configured site URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    allowedOrigins.push(process.env.NEXT_PUBLIC_SITE_URL);
  }

  // Add current host (for development and production)
  if (host) {
    allowedOrigins.push(`https://${host}`);
    allowedOrigins.push(`http://${host}`);
  }

  // Always allow localhost for development
  allowedOrigins.push('http://localhost:3000');
  allowedOrigins.push('http://127.0.0.1:3000');

  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null;
}
