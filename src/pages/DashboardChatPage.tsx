import { useState, useEffect, useRef } from "react";
import { ArrowDown, ArrowUp, SendHorizonal } from "lucide-react";
import { useChatMessageStore } from "../store/ChatMessageStore";
import { useAuthStore } from "../store/AuthStore";
import { socket } from "../App";
import { useChatStore } from "../store/ChatStore";
import { useLocation } from "react-router-dom";

import type {
  ChatMessage,
  SendMessage,
} from "../domain/interfaces/ChatMessage";

export const DashboardChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const { user, allProfiles, loading: authLoading } = useAuthStore();
  const {
    chats,
    fetchAllChats,
    markChatAsRead,
    loading: chatsLoading,
    updateChatWithNewMessage,
  } = useChatStore();
  const { messages, fetchMessagesByChatId, addMessage } = useChatMessageStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // Extrae el ID del chat de los parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const chatIdFromUrl = params.get("chatId");
    if (chatIdFromUrl) {
      setSelectedChatId(Number(chatIdFromUrl));
    }
  }, [location]);

  useEffect(() => {
    fetchAllChats();
    useAuthStore.getState().fetchAllProfiles();
  }, [fetchAllChats]);

  useEffect(() => {
    if (selectedChatId) {
      fetchMessagesByChatId(selectedChatId);
      markChatAsRead(selectedChatId);
      socket.emit("join_chat", selectedChatId);
    }

    return () => {
      if (selectedChatId) {
        socket.emit("leave_chat", selectedChatId);
      }
    };
  }, [selectedChatId, fetchMessagesByChatId, markChatAsRead]);

  // Manejador del socket para mensajes entrantes y actualizaciones del inbox
  useEffect(() => {
    const handleNewMessage = (message: ChatMessage) => {
      // Si el chat actualmente seleccionado coincide con el chat del mensaje entrante
      // y el remitente no eres tú, agrega el mensaje a la vista.
      if (
        message.chatId === selectedChatId &&
        message.senderId !== Number(user?.id)
      ) {
        addMessage(message);
      }

      // Siempre actualiza la lista de chats en la bandeja de entrada para mostrar el último mensaje,
      // sin importar si lo enviaste o lo recibiste.
      updateChatWithNewMessage(
        message.chatId,
        message.message,
        message.senderId
      );
    };

    socket.on("message_from_server", handleNewMessage);

    return () => {
      socket.off("message_from_server", handleNewMessage);
    };
  }, [user, addMessage, updateChatWithNewMessage, selectedChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Maneja los estados de carga para evitar errores de renderizado
  if (authLoading || chatsLoading || !user || !allProfiles) {
    return <div>Cargando...</div>;
  }

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const handleSelectChat = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  const handleBackToInbox = () => {
    setSelectedChatId(null);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !selectedChat) return;

    const receiverId =
      selectedChat.userId === Number(user.id)
        ? selectedChat.donorId
        : selectedChat.userId;

    const messageData: SendMessage = {
      message: newMessage.trim(),
      chatId: selectedChat.id,
      senderId: Number(user.id),
      receiverId: Number(receiverId),
    };

    const createdMessage = await useChatMessageStore
      .getState()
      .sendMessage(messageData);

    if (createdMessage) {
      socket.emit("send_message", createdMessage);
      setNewMessage("");
    }
  };

  if (selectedChatId === null) {
    const userChats = chats.filter(
      (chat) =>
        chat.userId === Number(user.id) || chat.donorId === Number(user.id)
    );

    return (
      <div className="flex w-full max-w-7xl mx-auto mt-10 p-4 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Inbox</h1>
          <div className="space-y-4">
            {userChats.map((chat) => {
              const otherUserId =
                chat.userId === Number(user.id) ? chat.donorId : chat.userId;
              const otherUser = allProfiles.find(
                (profile) => Number(profile.id) === otherUserId
              );

              // Determina el icono según quién envió el último mensaje
              const lastMessageIcon =
                chat.lastMessageSenderId === Number(user.id) ? (
                  <ArrowUp size={16} className="mr-1 text-gray-500" />
                ) : (
                  <ArrowDown size={16} className="mr-1 text-green-500" />
                );

              return (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                    chat.isRead
                      ? "bg-white hover:bg-gray-100"
                      : "bg-blue-50 hover:bg-blue-100"
                  }`}>
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`font-semibold ${
                        chat.isRead ? "text-gray-800" : "text-gray-900"
                      }`}>
                      {otherUser?.name || "User"}
                    </span>
                    <span className="text-sm text-gray-500">
                      {chat.createdAt
                        ? new Date(chat.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <p
                    className={`flex items-center text-sm ${
                      chat.isRead
                        ? "text-gray-600"
                        : "text-gray-800 font-medium"
                    }`}>
                    {chat.lastMessageSenderId && lastMessageIcon}
                    {chat.lastMessage}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  let userChat = allProfiles.find(
    (user) => String(user.id) === String(selectedChat?.userId)
  );
  if (user.id === userChat?.id) {
    userChat = allProfiles.find(
      (user) => String(user.id) === String(selectedChat?.donorId)
    );
  }

  return (
    <div className="flex w-full max-w-7xl mx-auto mt-10 p-4 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex-1">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackToInbox}
            className="text-gray-600 hover:text-gray-800 text-2xl mr-4">
            &larr;
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            {userChat?.name || "User"}
          </h1>
        </div>
        <div className="space-y-4 h-[400px] overflow-y-auto p-4 bg-white rounded-lg border border-gray-200">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === Number(user.id)
                  ? "justify-end"
                  : "justify-start"
              }`}>
              <div
                className={`flex items-start gap-2 p-3 rounded-xl max-w-[70%] text-sm
                  ${
                    message.senderId === Number(user.id)
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}>
                <span>{message.message}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            placeholder="Escribe tu mensaje..."
            className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSendMessage}
            className="rounded-lg bg-green-500 p-3 text-white font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            <SendHorizonal />
          </button>
        </div>
      </div>
    </div>
  );
};
