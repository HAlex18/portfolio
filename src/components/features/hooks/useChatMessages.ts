import { useState, useEffect, useRef, useCallback } from 'react';
import { CONFIG } from '@/config';
import type { ChatMessage, UseChatMessagesOptions, UseChatMessagesReturn } from '@/types';

export function useChatMessages({
  welcomeMessage,
  rateLimitedMessage,
  connectionErrorMessage,
}: UseChatMessagesOptions): UseChatMessagesReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const rateLimitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (rateLimitTimeoutRef.current) {
        clearTimeout(rateLimitTimeoutRef.current);
      }
    };
  }, []);

  // Initialize welcome message
  useEffect(() => {
    setMessages([{ role: 'assistant', content: welcomeMessage }]);
  }, [welcomeMessage]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading || isRateLimited) return;

    const userMessage: ChatMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages.filter((m) => m.role !== 'assistant' || messages.indexOf(m) !== 0), userMessage],
        }),
      });

      if (response.status === 429) {
        setIsRateLimited(true);
        setMessages((prev) => [...prev, { role: 'assistant', content: rateLimitedMessage }]);
        rateLimitTimeoutRef.current = setTimeout(() => setIsRateLimited(false), CONFIG.ui.rateLimitResetMs);
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
      setMessages((prev) => [...prev, { role: 'assistant', content: connectionErrorMessage }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, isRateLimited, messages, rateLimitedMessage, connectionErrorMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return {
    messages,
    input,
    setInput,
    isLoading,
    isRateLimited,
    sendMessage,
    handleKeyDown,
    messagesEndRef,
  };
}
