import { NextRequest, NextResponse } from 'next/server';
import { CONFIG } from '@/config';
import { developerProfile } from '@/data';
import { getClientIP, chatRateLimiter } from '@/utils/rateLimit';
import { sanitizeInput } from '@/utils/validation';
import { validateOrigin } from '@/utils/csrf';

// ============================================
// CHAT API ROUTE - Secure Anthropic Proxy
// ============================================

// System prompt - kept server-side for security
const SYSTEM_PROMPT = `You are a friendly AI assistant on a developer's portfolio website. Your job is to answer questions about them.

Here's information about the developer:
- Name: ${developerProfile.name}
- Role: ${developerProfile.role}
- Experience: ${developerProfile.experience}
- Skills: ${developerProfile.skills}
- Projects:
  ${developerProfile.projects}
- Interests: ${developerProfile.interests}
- Contact: ${developerProfile.availability}

Be helpful, concise, and friendly. Keep responses brief (2-3 sentences max unless more detail is asked). If asked something you don't know, suggest they use the contact form. Add occasional emoji to be personable but don't overdo it.`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
}

export async function POST(request: NextRequest) {
  try {
    // CSRF protection - validate Origin header
    const originError = validateOrigin(request);
    if (originError) return originError;

    // Check API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return NextResponse.json({ error: 'Chat service not configured' }, { status: 503 });
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    const { allowed, remaining } = chatRateLimiter.check(clientIP);

    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Too many messages. Please try again later.',
          retryAfter: CONFIG.api.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'Retry-After': CONFIG.api.retryAfterSeconds.toString(),
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
      content: sanitizeInput(msg.content, CONFIG.api.maxMessageLength),
    }));

    // Filter out empty messages
    const validMessages = sanitizedMessages.filter((msg) => msg.content.length > 0);

    if (validMessages.length === 0) {
      return NextResponse.json({ error: 'No valid messages provided' }, { status: 400 });
    }

    // Call Anthropic API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.api.timeoutMs);

    try {
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
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

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
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        return NextResponse.json({ error: 'Request timed out' }, { status: 504 });
      }
      throw error;
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
