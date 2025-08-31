// src/domain/repositories/ChatRepository.ts
import type { Chat, CreateChatDto } from "../interfaces/Chat";

export interface ChatRepository {
  getAllChats(): Promise<Chat[]>;
  getChatById(chatId: number): Promise<Chat>;
  create(dto: CreateChatDto): Promise<Chat>;
}
