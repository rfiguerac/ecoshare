// src/store/ChatMessageStore.ts
import { create } from "zustand";
import type {
  ChatMessage,
  SendMessage,
} from "../domain/interfaces/ChatMessage";
import { chatRepositoryImpl } from "../data/ChatMessage.impl";
import { chatMessageService } from "../services/chatMessageService";

const repo = chatRepositoryImpl;
const service = chatMessageService(repo);

interface ChatMessageState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  fetchMessagesByChatId: (chatId: number) => Promise<void>;
  sendMessage: (message: SendMessage) => Promise<void>;
  addMessage: (message: ChatMessage) => void;
}

export const useChatMessageStore = create<ChatMessageState>((set) => ({
  messages: [],
  loading: false,
  error: null,

  fetchMessagesByChatId: async (chatId: number) => {
    set({ loading: true, error: null });
    try {
      const data = await service.getMessagesByChatId(chatId);
      set({ messages: data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: "Error al obtener los mensajes: " + error.message,
      });
      console.error(error);
    }
  },

  sendMessage: async (message: SendMessage) => {
    try {
      await service.sendMessage(message);
    } catch (error: any) {
      set({
        error: "Error al enviar el mensaje: " + error.message,
      });
      console.error(error);
    }
  },

  addMessage: (message: ChatMessage) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },
}));
