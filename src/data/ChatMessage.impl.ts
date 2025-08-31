// src/data/ChatMessage.impl.ts
import { ecoshareApi } from "../api/ecoshareApi";
import type { ChatMessageRepository } from "../domain/repositories/ChatMessageRepository";
import type { SendMessage } from "../domain/interfaces/ChatMessage";

export const chatRepositoryImpl: ChatMessageRepository = {
  getMessagesByChatId: async (chatId: number) => {
    const response = await ecoshareApi.get(`/chat-messages/${chatId}/messages`);
    return response.data;
  },
  sendMessage: async (message: SendMessage) => {
    // La lógica para crear o encontrar el chat debe estar en otro lugar
    // o ser manejada por la API de backend de manera implícita.
    // Aquí solo se envía el mensaje.
    const response = await ecoshareApi.post(
      `/chat-messages/send-message`,
      message
    );
    return response.data;
  },
};
