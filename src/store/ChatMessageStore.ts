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
  activeChatId: number | null;
  loading: boolean;
  error: string | null;
  setActiveChatId: (chatId: number | null) => void;
  fetchMessagesByChatId: (chatId: number) => Promise<void>;
  sendMessage: (message: SendMessage) => Promise<ChatMessage | undefined>;
  addMessage: (message: ChatMessage) => void;
}

export const useChatMessageStore = create<ChatMessageState>((set, get) => ({
  messages: [],
  activeChatId: null,
  loading: false,
  error: null,

  setActiveChatId: (chatId: number | null) => {
    // Al cambiar de chat, limpiamos los mensajes anteriores
    set({ activeChatId: chatId, messages: [] });
  },

  fetchMessagesByChatId: async (chatId: number) => {
    set({ loading: true, error: null });
    try {
      const data = await service.getMessagesByChatId(chatId);
      set({ messages: data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: "Error al obtener los mensajes." });
    }
  },

  sendMessage: async (
    message: SendMessage
  ): Promise<ChatMessage | undefined> => {
    try {
      return await service.sendMessage(message);
    } catch (error: any) {
      set({ error: "Error al enviar el mensaje." });
      return undefined;
    }
  },

  // ✅ Esta función es llamada por el listener central en App.tsx
  addMessage: (message: ChatMessage) => {
    const { activeChatId } = get();
    // Solo añade el mensaje si el chat correspondiente está abierto en la UI
    if (activeChatId === message.chatId) {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    }
  },
}));
