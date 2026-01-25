// ============================================
// AI CHATBOT TYPE DEFINITIONS
// ============================================

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface UseChatMessagesOptions {
  welcomeMessage: string;
  rateLimitedMessage: string;
  connectionErrorMessage: string;
}

export interface UseChatMessagesReturn {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  isRateLimited: boolean;
  sendMessage: () => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}
