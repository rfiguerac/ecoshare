import type { ChatMessage, SendMessage } from "../interfaces/ChatMessage";

export interface ChatMessageRepository {
  getMessagesByChatId(chatId: number): Promise<ChatMessage[]>;
  sendMessage(message: SendMessage): Promise<ChatMessage>;
}
