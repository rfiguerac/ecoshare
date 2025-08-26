import type { ChatRepository } from "../domain/repositories/ChatRepository";

export const chatService = (repository: ChatRepository) => {
	const getAllChats = async () => {
		return await repository.getAllChats();
	};

	const getChatById = async (chatId: number) => {
		return await repository.getChatById(chatId);
	};

    return { getAllChats, getChatById, }
};
