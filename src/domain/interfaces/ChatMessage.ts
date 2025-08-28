export interface ChatMessage {
    id: number;
    message: string;
    chatId: number;
    senderId: number;
    receiverId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SendMessage extends Omit<ChatMessage, "id" | "createdAt" | "updatedAt"> {}