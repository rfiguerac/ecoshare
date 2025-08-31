// src/pages/DashboardChatPage.tsx
import { useState, useEffect } from "react";
import { SendHorizonal } from "lucide-react";
import { useChatMessageStore } from "../store/ChatMessageStore";
import { useAuthStore } from "../store/AuthStore";
import { socket } from "../App";
import { useChatStore } from "../store/ChatStore";
import type {
  ChatMessage,
  SendMessage,
} from "../domain/interfaces/ChatMessage";

export const DashboardChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const { user, allProfiles } = useAuthStore();
  const { chats, fetchAllChats, markChatAsRead } = useChatStore();
  const { messages, fetchMessagesByChatId, sendMessage } =
    useChatMessageStore();

  useEffect(() => {
    fetchAllChats();
    useAuthStore.getState().fetchAllProfiles();
  }, [fetchAllChats]);

  useEffect(() => {
    if (selectedChatId) {
      fetchMessagesByChatId(selectedChatId);
      markChatAsRead(selectedChatId);
    }
  }, [selectedChatId, fetchMessagesByChatId, markChatAsRead]);

  useEffect(() => {
    socket.on("receive_message", (message: ChatMessage) => {
      if (selectedChatId === message.chatId) {
        useChatMessageStore.getState().addMessage(message);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [selectedChatId]);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const handleSelectChat = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  const handleBackToInbox = () => {
    setSelectedChatId(null);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !selectedChat) return;
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    const receiverId =
      Number(selectedChat.userId) === Number(user.id)
        ? selectedChat.userId
        : user.id;

    const messageData: SendMessage = {
      message: newMessage.trim(),
      chatId: selectedChat.id,
      senderId: Number(user.id),
      receiverId: Number(receiverId),
    };

    await sendMessage(messageData);
    socket.emit("send_message", messageData);
    setNewMessage("");
  };

  if (selectedChatId === null) {
    return (
      <div className="flex w-full max-w-7xl mx-auto mt-10 p-4 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Inbox</h1>
          <div className="space-y-4">
            {chats.map((chat) => (
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
                    {allProfiles?.find((p) => p.id === String(chat.userId))
                      ?.name || "User"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {chat.createdAt
                      ? new Date(chat.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    chat.isRead ? "text-gray-600" : "text-gray-800 font-medium"
                  }`}>
                  {chat.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const otherUser = allProfiles?.find(
    (p) => p.id === String(selectedChat?.userId)
  );

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
            {otherUser?.name || "User"}
          </h1>
        </div>
        <div className="space-y-4 h-[500px] overflow-y-auto p-4 bg-white rounded-lg border border-gray-200">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId == Number(user?.id)
                  ? "justify-end"
                  : "justify-start"
              }`}>
              <div
                className={`flex items-start gap-2 p-3 rounded-xl max-w-[70%] text-sm
                  ${
                    message.senderId == Number(user?.id)
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}>
                <span>{message.message}</span>
              </div>
            </div>
          ))}
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
