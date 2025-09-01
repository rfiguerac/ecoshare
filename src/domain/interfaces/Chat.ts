// src/domain/interfaces/Chat.ts
export interface Chat {
  id: number;
  userId: number; // Asegúrate de que sea number
  donorId: number;
  isRead: boolean;
  lastMessage: string;
  lastMessageSenderId?: number; // Propiedad nueva
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateChatDto {
  userId: number;
  donorId: number;
}
