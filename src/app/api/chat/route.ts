import { NextRequest, NextResponse } from 'next/server';

// ============================================
// CHAT API ROUTE - Secure Anthropic Proxy
// ============================================

// In-memory rate limiting (resets on server restart)
// For production, use Redis or Vercel KV
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // messages per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

// System prompt - kept server-side for security
const SYSTEM_PROMPT = `You are a friendly AI assistant on a developer's portfolio website. Your job is to answer questions about them.

Here's information about the developer:
- Name: [Your Name]
- Role: System Developer, Web Developer, AI Developer
- Experience: 5+ years in software development
- Skills: TypeScript, Python, Rust, Go, React, Next.js, Node.js, FastAPI, PostgreSQL, PyTorch, TensorFlow, LangChain, Docker, Kubernetes, AWS
- Projects:
  1. Neural Engine - AI/ML project
  2. Cloud Platform - Full stack application
  3. Data Cosmos - Data engineering project
  4. Mobile Galaxy - React Native mobile app
- Interests: Open source, AI research, new technologies
- Contact: Available for freelance and full-time opportunities

Be helpful, concise, and friendly. Keep responses brief (2-3 sentences max unless more detail is asked). If asked something you don't know, suggest they use the contact form. Add occasional emoji to be personable but don't overdo it.`;

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

function sanitizeInput(text: string): string {
  // Strip HTML tags and limit length
  return text
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, 500);
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
}

export async function POST(request: NextRequest) {
  try {
    // Check API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return NextResponse.json({ error: 'Chat service not configured' }, { status: 503 });
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    const { allowed, remaining } = checkRateLimit(clientIP);

    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Too many messages. Please try again later.',
          retryAfter: 3600,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'Retry-After': '3600',
          },
        }
      );
    }

    // Parse and validate request
    const body: ChatRequestBody = await request.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: 'Invalid request: messages array required' }, { status: 400 });
    }

    // Sanitize messages
    const sanitizedMessages = body.messages.map((msg) => ({
      role: msg.role,
      content: sanitizeInput(msg.content),
    }));

    // Filter out empty messages
    const validMessages = sanitizedMessages.filter((msg) => msg.content.length > 0);

    if (validMessages.length === 0) {
      return NextResponse.json({ error: 'No valid messages provided' }, { status: 400 });
    }

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: validMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Anthropic API error:', response.status, errorData);
      return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 502 });
    }

    const data = await response.json();
    const assistantMessage = data.content?.[0]?.text || 'Sorry, I had trouble responding. Please try again!';

    return NextResponse.json(
      { message: assistantMessage },
      {
        headers: {
          'X-RateLimit-Remaining': remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
