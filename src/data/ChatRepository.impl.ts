import { ecoshareApi } from "../api/ecoshareApi";
import type { ChatRepository } from "../domain/repositories/ChatRepository";

export const chatRepositoryImpl: ChatRepository = {
	getAllChats: async () => {
		const response = await ecoshareApi.get("/chats");
		return response.data;
	},
	getChatById: async (chatId) => {
		const response = await ecoshareApi.get(`/chats/${chatId}`);
		return response.data;
	},
};
