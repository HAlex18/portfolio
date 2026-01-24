import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONFIG } from '@/config';
import { getClientIP, contactRateLimiter } from '@/utils/rateLimit';
import { sanitizeInput, isValidEmail, sanitizeEmailForHeader } from '@/utils/validation';

// ============================================
// CONTACT API ROUTE - Secure Form Submission
// ============================================

interface ContactRequestBody {
  name: string;
  company?: string | null;
  email: string;
  message: string;
  website?: string; // Honeypot field
}

export async function POST(request: NextRequest) {
  try {
    // Check API keys
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey || !contactEmail) {
      console.error('RESEND_API_KEY or CONTACT_EMAIL not configured');
      return NextResponse.json({ error: 'Contact service not configured' }, { status: 503 });
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    const { allowed, remaining } = contactRateLimiter.check(clientIP);

    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Too many submissions. Please try again later.',
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

    // Parse request body
    const body: ContactRequestBody = await request.json();

    // Honeypot check - if filled, it's a bot
    if (body.website && body.website.trim().length > 0) {
      // Silently accept but don't send email (fool the bot)
      return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
    }

    // Validate required fields
    const name = sanitizeInput(body.name || '', CONFIG.api.maxNameLength);
    const email = sanitizeInput(body.email || '', CONFIG.api.maxEmailLength);
    const message = sanitizeInput(body.message || '', CONFIG.api.maxContactMessageLength);
    const company = body.company ? sanitizeInput(body.company, CONFIG.api.maxCompanyLength) : null;

    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Name is required (minimum 2 characters)' }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    if (!message || message.length < 10) {
      return NextResponse.json({ error: 'Message is required (minimum 10 characters)' }, { status: 400 });
    }

    // Send email via Resend
    const resend = new Resend(resendApiKey);

    const { error: sendError } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: contactEmail,
      replyTo: sanitizeEmailForHeader(email),
      subject: `Portfolio Contact: ${name}${company ? ` (${company})` : ''}`,
      text: `
New message from your portfolio website:

Name: ${name}
${company ? `Company: ${company}\n` : ''}Email: ${email}

Message:
${message}

---
Sent from portfolio contact form
IP: ${clientIP}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0f2847 0%, #081428 100%); color: #e2e8f0; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 16px; }
    .label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
    .value { margin-top: 4px; color: #1e293b; }
    .message-box { background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; }
    .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Portfolio Message</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${name}${company ? ` &middot; ${company}` : ''}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
      <div class="footer">
        Sent from portfolio contact form
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 502 });
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      {
        headers: {
          'X-RateLimit-Remaining': remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
