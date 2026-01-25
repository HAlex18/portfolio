# Chat API Specification

> Last Updated: 2026-01-18

## Overview

The Chat API is a secure Next.js API route that proxies requests to the Anthropic Claude API. It provides:

- Rate limiting to prevent abuse (20 messages/hour per IP)
- Input sanitization to prevent injection attacks
- Server-side API key and system prompt storage

### User-Facing Functionality

Enables visitors to ask questions about the portfolio owner via an AI chatbot interface. The assistant responds with contextual information about skills, projects, and experience.

---

## Architecture

### Data Flow

```
┌─────────────┐     POST /api/chat      ┌──────────────┐
│  AIChatbot  │ ──────────────────────► │  route.ts    │
│  Component  │                         │              │
│  (Client)   │ ◄────────────────────── │  - Rate limit│
└─────────────┘     JSON Response       │  - Sanitize  │
                                        │  - Proxy     │
                                        └──────┬───────┘
                                               │
                                               ▼
                                        ┌──────────────┐
                                        │  Anthropic   │
                                        │  Claude API  │
                                        │  (Sonnet 4)  │
                                        └──────────────┘
```

### Component Structure

- **API Route**: `src/app/api/chat/route.ts` - Server-side proxy with security layers
- **Frontend**: `src/components/features/AIChatbot.tsx` - Floating chat UI
- **Types**: `src/types/chatbot.ts` - Shared type definitions
- **Locales**: `src/locales/en.json`, `src/locales/ja.json` - Translation strings

---

## Implementation Details

### Key Files

| File                                    | Responsibility                                   |
| --------------------------------------- | ------------------------------------------------ |
| `src/app/api/chat/route.ts`             | Rate limiting, sanitization, Anthropic API proxy |
| `src/components/features/AIChatbot.tsx` | Chat UI, message state, user interaction         |
| `src/types/chatbot.ts`                  | ChatMessage interface                            |
| `src/locales/en.json`                   | English translations (chat section)              |
| `src/locales/ja.json`                   | Japanese translations (chat section)             |

### Rate Limiting

- **Storage**: In-memory Map (resets on server restart)
- **Limit**: 20 messages per hour per IP
- **Window**: 3,600,000 ms (1 hour)
- **IP Detection**: `x-forwarded-for` header, fallback to `x-real-ip`

### Input Sanitization

```typescript
function sanitizeInput(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .trim()
    .slice(0, 500); // 500 char limit
}
```

### State Management (Frontend)

- `messages`: ChatMessage[] - Conversation history
- `input`: string - Current user input
- `isOpen`: boolean - Chat window visibility
- `isDismissed`: boolean - Permanently closed state
- `isLoading`: boolean - Request in progress
- `isRateLimited`: boolean - Rate limit exceeded

---

## API Interface

### Endpoint

`POST /api/chat`

### Request

```typescript
interface ChatRequestBody {
  messages: ChatMessage[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
```

### Responses

| Status | Description            | Body                                  |
| ------ | ---------------------- | ------------------------------------- |
| 200    | Success                | `{ message: string }`                 |
| 400    | Invalid request        | `{ error: string }`                   |
| 429    | Rate limited           | `{ error: string, retryAfter: 3600 }` |
| 502    | Anthropic API error    | `{ error: string }`                   |
| 503    | API key not configured | `{ error: string }`                   |

### Headers

- `X-RateLimit-Remaining`: Number of remaining requests
- `Retry-After`: Seconds until rate limit resets (only on 429)

---

## Security Considerations

### Implemented

1. **API Key Protection**: Stored server-side in `ANTHROPIC_API_KEY` env var
2. **System Prompt Immutability**: Hardcoded server-side, not modifiable by client
3. **Rate Limiting**: IP-based, 20 req/hour to prevent abuse
4. **Input Sanitization**: HTML stripping, length limits
5. **Generic Error Messages**: No sensitive info leaked in errors

### Limitations

- In-memory rate limiting resets on deploy/restart
- Rate limit is per-IP (shared network issues)
- No user authentication (public endpoint)

### Production Recommendations

- Replace in-memory Map with Redis or Vercel KV
- Add user authentication for persistent limits
- Implement usage monitoring and alerting

---

## Internationalization

### Translation Keys (`chat` namespace)

| Key               | English                     | Japanese                   |
| ----------------- | --------------------------- | -------------------------- |
| `title`           | Portfolio Assistant         | ポートフォリオアシスタント |
| `subtitle`        | Powered by Claude AI        | Claude AIで動作            |
| `welcomeMessage`  | Hey! I'm an AI assistant... | (localized)                |
| `placeholder`     | Ask about me...             | (localized)                |
| `disclaimer`      | AI may make mistakes...     | (localized)                |
| `rateLimited`     | You've sent too many...     | (localized)                |
| `connectionError` | Oops! I'm having...         | (localized)                |
| `ariaOpenChat`    | Open chat                   | (localized)                |
| `ariaCloseChat`   | Close chat                  | (localized)                |
| `ariaDismissChat` | Dismiss chat                | (localized)                |

---

## Related Files

| Path                                    | Role                          |
| --------------------------------------- | ----------------------------- |
| `src/app/api/chat/route.ts`             | Main API route implementation |
| `src/components/features/AIChatbot.tsx` | Frontend chat component       |
| `src/components/features/index.ts`      | Component barrel export       |
| `src/types/chatbot.ts`                  | ChatMessage type definition   |
| `src/types/index.ts`                    | Type barrel export            |
| `src/locales/en.json`                   | English translations          |
| `src/locales/ja.json`                   | Japanese translations         |
| `src/constants/colors.ts`               | COLORS constant for styling   |
| `src/app/[locale]/page.tsx`             | Main page (renders AIChatbot) |
