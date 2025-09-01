// src/store/ChatStore.ts
import { create } from "zustand";
import type { Chat } from "../domain/interfaces/Chat";
import { chatRepositoryImpl } from "../data/ChatRepository.impl";
import { chatService } from "../services/chatService";
import { ecoshareApi } from "../api/ecoshareApi";

const repo = chatRepositoryImpl;
const service = chatService(repo);

interface ChatState {
  chats: Chat[];
  loading: boolean;
  error: string | null;
  fetchAllChats: () => Promise<void>;
  markChatAsRead: (chatId: number) => Promise<void>;
  updateChatWithNewMessage: (
    chatId: number,
    lastMessage: string,
    senderId: number
  ) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  loading: false,
  error: null,

  fetchAllChats: async () => {
    set({ loading: true, error: null });
    try {
      const data = await service.getAllChats();
      set({ chats: data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: "Error al obtener los chats: " + error.message,
      });
    }
  },

  markChatAsRead: async (chatId: number) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, isRead: true } : chat
      ),
    }));
    try {
      await ecoshareApi.put(`/chats/${chatId}/read`);
    } catch (error) {
      console.error("Failed to mark chat as read on server:", error);
      set((state) => ({
        chats: state.chats.map((chat) =>
          chat.id === chatId ? { ...chat, isRead: false } : chat
        ),
      }));
    }
  },

  updateChatWithNewMessage: (
    chatId: number,
    lastMessage: string,
    senderId: number
  ) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            lastMessage,
            lastMessageSenderId: senderId,
            isRead: false,
            updatedAt: new Date(),
          };
        }
        return chat;
      }),
    }));
  },
}));
