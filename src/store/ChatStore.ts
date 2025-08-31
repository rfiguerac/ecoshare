// src/store/ChatStore.ts
import { create } from "zustand";
import type { Chat } from "../domain/interfaces/Chat";
import { chatRepositoryImpl } from "../data/ChatRepository.impl";
import { chatService } from "../services/chatService";

const repo = chatRepositoryImpl;
const service = chatService(repo);

interface ChatState {
  chats: Chat[];
  loading: boolean;
  error: string | null;
  fetchAllChats: () => Promise<void>;
  markChatAsRead: (chatId: number) => void;
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
      console.error(error);
    }
  },

  markChatAsRead: (chatId: number) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, isRead: true } : chat
      ),
    }));
  },
}));
