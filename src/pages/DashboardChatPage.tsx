import { useState } from "react";
import Chats from "../data/chats";
import { SendHorizonal } from "lucide-react";

export const DashboardChatPage = () => {
  const [chats, setChats] = useState(Chats);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Find the selected chat based on the state variable
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  // Handles clicking a chat card in the inbox
  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
    // Mark the selected chat as read
    setChats(
      chats.map((chat) =>
        chat.id === chatId ? { ...chat, isRead: true } : chat
      )
    );
  };

  // Handles returning to the inbox view
  const handleBackToInbox = () => {
    setSelectedChatId(null);
  };

  // Handles a specific action on a chat message
  const handleMessageAction = (messageId) => {
    console.log(`Action button clicked for message ID: ${messageId}`);
  };

  // Handles sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedChat) return;

    // Create a new message object
    const newMsg = {
      id: Date.now(),
      text: newMessage.trim(),
      sender: "You",
    };

    // Update the chats state with the new message
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMsg],
              lastMessage: newMessage.trim(), // Update last message
            }
          : chat
      )
    );

    // Clear the input field after sending
    setNewMessage("");
  };

  // --- Chat Inbox View ---
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
                className={`
                                    p-4 rounded-lg cursor-pointer transition-colors duration-200
                                    ${
                                      chat.isRead
                                        ? "bg-white hover:bg-gray-100"
                                        : "bg-blue-50 hover:bg-blue-100"
                                    }
                                `}>
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`font-semibold ${
                      chat.isRead ? "text-gray-800" : "text-gray-900"
                    }`}>
                    {chat.sender}
                  </span>
                  <span className="text-sm text-gray-500">
                    {chat.timestamp}
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

  // --- Chat Conversation View ---
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
            {selectedChat ? selectedChat.sender : ""}
          </h1>
        </div>
        <div className="space-y-4 h-[500px] overflow-y-auto p-4 bg-white rounded-lg border border-gray-200">
          {selectedChat?.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "You" ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`flex items-start gap-2 p-3 rounded-xl max-w-[70%] text-sm
                                    ${
                                      message.sender === "You"
                                        ? "bg-green-500 text-white rounded-br-none"
                                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                                    }
                                `}>
                <span>{message.text}</span>
                <button
                  onClick={() => handleMessageAction(message.id)}
                  className={`
                                        opacity-0 transition-opacity duration-200
                                        hover:opacity-100 focus:opacity-100
                                        text-gray-400
                                    `}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* New message input and send button */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            placeholder="Type your message..."
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

export default DashboardChatPage;
