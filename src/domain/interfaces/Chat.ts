// src/domain/interfaces/Chat.ts
export interface Chat {
  id: number;
  userId: number;
  donorId: number;
  isRead: boolean;
  lastMessage: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateChatDto {
  userId: number;
  donorId: number;
}
