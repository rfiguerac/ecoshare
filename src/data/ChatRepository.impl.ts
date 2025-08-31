// src/data/ChatRepository.impl.ts
import { ecoshareApi } from "../api/ecoshareApi";
import type { ChatRepository } from "../domain/repositories/ChatRepository";
import type { Chat, CreateChatDto } from "../domain/interfaces/Chat";

export const chatRepositoryImpl: ChatRepository = {
  getAllChats: async () => {
    const response = await ecoshareApi.get("/chats");
    return response.data;
  },
  getChatById: async (chatId) => {
    const response = await ecoshareApi.get(`/chats/${chatId}`);
    return response.data;
  },
  create: async (dto: CreateChatDto) => {
    const response = await ecoshareApi.post("/chats", dto);
    return response.data;
  },
};
