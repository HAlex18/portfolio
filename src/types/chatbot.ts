// ============================================
// AI CHATBOT TYPE DEFINITIONS
// ============================================

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
