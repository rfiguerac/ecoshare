import type { ChatMessageRepository } from "../domain/repositories/ChatMessageRepository";
import type { SendMessage } from "../domain/interfaces/ChatMessage";

export const chatMessageService = (repository: ChatMessageRepository) => {
    const getMessagesByChatId = async (chatId: number) => {
        return await repository.getMessagesByChatId(chatId);
    }

    const sendMessage = async (message: SendMessage) => {
        return await repository.sendMessage(message);
    }

    return { getMessagesByChatId, sendMessage, }
};
