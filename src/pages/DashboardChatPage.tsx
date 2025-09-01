// src/pages/DashboardChatPage.tsx
import { useState, useEffect, useRef } from "react";
import { ArrowDown, ArrowUp, SendHorizonal } from "lucide-react";
import { useChatMessageStore } from "../store/ChatMessageStore";
import { useAuthStore } from "../store/AuthStore";
import { socket } from "../App";
import { useChatStore } from "../store/ChatStore";
import { useLocation, useNavigate } from "react-router-dom";
import type { SendMessage } from "../domain/interfaces/ChatMessage";

export const DashboardChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtenemos el estado y las acciones de los stores
  const { user, allProfiles } = useAuthStore();
  const { chats, fetchAllChats, markChatAsRead } = useChatStore();
  const { messages, fetchMessagesByChatId, setActiveChatId, activeChatId } =
    useChatMessageStore();

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Efecto para leer el ID del chat desde la URL y notificar al store
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const chatIdFromUrl = params.get("chatId");
    const newChatId = chatIdFromUrl ? Number(chatIdFromUrl) : null;
    setActiveChatId(newChatId);
  }, [location, setActiveChatId]);

  // Efecto para cargar los datos iniciales
  useEffect(() => {
    fetchAllChats();
    if (!allProfiles || allProfiles.length === 0) {
      useAuthStore.getState().fetchAllProfiles();
    }
  }, [fetchAllChats, allProfiles]);

  // Efecto que reacciona cuando el chat activo cambia
  useEffect(() => {
    if (activeChatId) {
      fetchMessagesByChatId(activeChatId);
      markChatAsRead(activeChatId);
      socket.emit("join_chat", activeChatId);
    }

    // Función de limpieza para salir de la sala de socket
    return () => {
      if (activeChatId) {
        socket.emit("leave_chat", activeChatId);
      }
    };
  }, [activeChatId, fetchMessagesByChatId, markChatAsRead]);

  // Efecto para hacer scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    const selectedChat = chats.find((chat) => chat.id === activeChatId);
    if (newMessage.trim() === "" || !selectedChat || !user) return;

    const receiverId =
      selectedChat.userId === Number(user.id)
        ? selectedChat.donorId
        : selectedChat.userId;

    const messageData: SendMessage = {
      message: newMessage.trim(),
      chatId: selectedChat.id,
      senderId: Number(user.id),
      receiverId: receiverId,
    };

    const createdMessage = await useChatMessageStore
      .getState()
      .sendMessage(messageData);

    if (createdMessage) {
      socket.emit("send_message", createdMessage);
      setNewMessage("");
    }
  };

  const handleSelectChat = (chatId: number) => {
    navigate(`/dashboard/chats?chatId=${chatId}`);
  };

  const handleBackToInbox = () => {
    navigate("/dashboard/chats");
  };

  // ... (El JSX se mantiene igual que en la versión anterior)
  if (!user || !allProfiles) {
    return <div>Cargando...</div>;
  }

  if (activeChatId === null) {
    const userChats = chats
      .filter(
        (chat) =>
          chat.userId === Number(user.id) || chat.donorId === Number(user.id)
      )
      .sort(
        (a, b) =>
          new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime()
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

              const isLastMessageFromMe =
                chat.lastMessageSenderId === Number(user.id);
              const lastMessageIcon = chat.lastMessageSenderId ? (
                isLastMessageFromMe ? (
                  <ArrowUp
                    size={16}
                    className="mr-1 text-gray-500 flex-shrink-0"
                  />
                ) : (
                  <ArrowDown
                    size={16}
                    className="mr-1 text-green-500 flex-shrink-0"
                  />
                )
              ) : null;

              return (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                    chat.isRead || isLastMessageFromMe
                      ? "bg-white hover:bg-gray-100"
                      : "bg-blue-50 hover:bg-blue-100 font-bold"
                  }`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-800">
                      {otherUser?.name || "Usuario Desconocido"}
                    </span>
                    <span className="text-sm text-gray-500">
                      {chat.updatedAt
                        ? new Date(chat.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <p className="flex items-center text-sm text-gray-600 truncate">
                    {lastMessageIcon}
                    <span
                      className={
                        !chat.isRead && !isLastMessageFromMe
                          ? "font-bold text-gray-900"
                          : ""
                      }>
                      {chat.lastMessage}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const selectedChat = chats.find((chat) => chat.id === activeChatId);
  let otherUser = allProfiles.find(
    (u) =>
      selectedChat &&
      u.id ===
        (Number(user.id) === selectedChat.userId
          ? String(selectedChat.donorId)
          : String(selectedChat.userId))
  );

  return (
    <div className="flex w-full max-w-7xl mx-auto mt-10 p-4 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex-1 flex flex-col h-[70vh]">
        <div className="flex items-center mb-4 pb-4 border-b">
          <button
            onClick={handleBackToInbox}
            className="text-gray-600 hover:text-gray-800 text-2xl mr-4">
            &larr;
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            {otherUser?.name || "Chat"}
          </h1>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4 bg-white rounded-lg border border-gray-200">
          {messages.map((message, index) => (
            <div
              key={message.id || `msg-${index}`} // Fallback key
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
