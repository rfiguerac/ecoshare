import { ecoshareApi } from "../api/ecoshareApi";
import type { ChatMessageRepository } from "../domain/repositories/ChatMessageRepository";
import type { SendMessage } from "../domain/interfaces/ChatMessage";

export const chatRepositoryImpl: ChatMessageRepository = {
    getMessagesByChatId: async (chatId: number) => {
        const response = await ecoshareApi.get(`/chat-messages/${chatId}/messages`);
        return response.data;
    },
    sendMessage: async (message: SendMessage) => {
        await ecoshareApi.post(`/chat-messages/send-message`, message);
    },
};
