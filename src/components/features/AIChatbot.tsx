'use client';

import { useState, useEffect, useRef } from 'react';
import { COLORS } from '@/constants/colors';
import type { ChatMessage } from '@/types';

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hey! 👋 I'm an AI assistant here to tell you about this developer. Ask me anything about their skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle close - dismiss completely
  const handleClose = () => {
    setIsOpen(false);
    setIsDismissed(true);
  };

  // Don't render if dismissed
  if (isDismissed) return null;

  const sendMessage = async () => {
    if (!input.trim() || isLoading || isRateLimited) return;

    const userMessage: ChatMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call our secure API route instead of Anthropic directly
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages.filter((m) => m.role !== 'assistant' || messages.indexOf(m) !== 0), userMessage],
        }),
      });

      // Handle rate limiting
      if (response.status === 429) {
        setIsRateLimited(true);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "You've sent too many messages. Please try again in an hour, or use the contact form below. 🙏",
          },
        ]);
        // Reset rate limit state after 1 hour
        setTimeout(() => setIsRateLimited(false), 60 * 60 * 1000);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.message || 'Sorry, I had trouble responding. Please try again!',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Oops! I'm having connection issues. Please try again or use the contact form below.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
        }}
      >
        {/* Small X to dismiss */}
        <button
          onClick={handleClose}
          aria-label="Dismiss chat"
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: COLORS.void,
            border: `2px solid ${COLORS.border}`,
            color: COLORS.textMuted,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = COLORS.accent;
            e.currentTarget.style.color = COLORS.text;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = COLORS.border;
            e.currentTarget.style.color = COLORS.textMuted;
          }}
        >
          ✕
        </button>

        {/* Main chat button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: COLORS.accent,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 20px ${COLORS.accent}50, 0 0 40px ${COLORS.accent}20`,
            transition: 'all 0.3s ease',
            transform: isOpen ? 'scale(0.9)' : 'scale(1)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = isOpen ? 'scale(0.95)' : 'scale(1.1)';
            e.currentTarget.style.boxShadow = `0 6px 30px ${COLORS.accent}70, 0 0 60px ${COLORS.accent}30`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = isOpen ? 'scale(0.9)' : 'scale(1)';
            e.currentTarget.style.boxShadow = `0 4px 20px ${COLORS.accent}50, 0 0 40px ${COLORS.accent}20`;
          }}
        >
          {isOpen ? (
            <span style={{ fontSize: '24px', color: COLORS.void }}>✕</span>
          ) : (
            <span style={{ fontSize: '28px' }}>🤖</span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      <div
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          width: '380px',
          maxWidth: 'calc(100vw - 48px)',
          height: '500px',
          maxHeight: 'calc(100vh - 140px)',
          background: COLORS.space,
          borderRadius: '16px',
          border: `1px solid ${COLORS.border}`,
          boxShadow: '0 10px 50px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 999,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            background: `linear-gradient(135deg, ${COLORS.nebulaPrimary} 0%, ${COLORS.nebulaSecondary} 100%)`,
            borderBottom: `1px solid ${COLORS.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: COLORS.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            🤖
          </div>
          <div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: COLORS.text,
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
              }}
            >
              Portfolio Assistant
            </div>
            <div
              style={{
                fontSize: '12px',
                color: COLORS.textMuted,
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
              Powered by Claude AI
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? COLORS.accent : COLORS.cardBg,
                  color: msg.role === 'user' ? COLORS.void : COLORS.text,
                  fontSize: '14px',
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                  lineHeight: 1.5,
                  border: msg.role === 'user' ? 'none' : `1px solid ${COLORS.border}`,
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: COLORS.cardBg,
                  border: `1px solid ${COLORS.border}`,
                  display: 'flex',
                  gap: '4px',
                }}
              >
                <span style={{ animation: 'bounce 1s ease-in-out infinite' }}>●</span>
                <span style={{ animation: 'bounce 1s ease-in-out 0.1s infinite' }}>●</span>
                <span style={{ animation: 'bounce 1s ease-in-out 0.2s infinite' }}>●</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: '16px',
            borderTop: `1px solid ${COLORS.border}`,
            background: COLORS.void,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-end',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about me..."
              style={{
                flex: 1,
                padding: '12px 16px',
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '12px',
                color: COLORS.text,
                fontSize: '14px',
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: input.trim() ? COLORS.accent : COLORS.cardBg,
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                opacity: input.trim() ? 1 : 0.5,
              }}
            >
              <span
                style={{
                  fontSize: '18px',
                  color: input.trim() ? COLORS.void : COLORS.textDim,
                }}
              >
                ↑
              </span>
            </button>
          </div>
          <p
            style={{
              fontSize: '11px',
              color: COLORS.textDim,
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
              textAlign: 'center',
              marginTop: '10px',
            }}
          >
            AI may make mistakes • Built to showcase AI skills
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}
