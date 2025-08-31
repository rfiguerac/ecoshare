// src/domain/interfaces/Chat.ts
export interface Chat {
  id: number;
  userId: string;
  isRead: boolean;
  lastMessage: string;
  createdAt?: Date;
  updatedAt?: Date;
}
