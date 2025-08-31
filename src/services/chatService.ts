// src/services/chatService.ts
import type { ChatRepository } from "../domain/repositories/ChatRepository";
import type { CreateChatDto } from "../domain/interfaces/Chat";

export const chatService = (repository: ChatRepository) => {
  const getAllChats = async () => {
    return await repository.getAllChats();
  };

  const getChatById = async (chatId: number) => {
    return await repository.getChatById(chatId);
  };

  const createChat = async (dto: CreateChatDto) => {
    return await repository.create(dto);
  };

  return { getAllChats, getChatById, createChat };
};
