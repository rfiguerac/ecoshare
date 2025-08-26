import type {
	Chat,
} from "../interfaces/Chat";

export interface ChatRepository {
    getAllChats(): Promise<Chat[]>;
	getChatById(chatId: number): Promise<Chat>;
}
