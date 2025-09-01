// src/App.tsx
import { useEffect } from "react";
import AppRouter from "./router";
import { useAuthStore } from "./store/AuthStore";
import { io } from "socket.io-client";
import { useChatStore } from "./store/ChatStore";
import { useChatMessageStore } from "./store/ChatMessageStore";
import type { ChatMessage } from "./domain/interfaces/ChatMessage";

// Exporta la instancia del socket para que sea accesible en toda la app
export const socket = io("http://localhost:3002");

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ✅ Listener de Sockets centralizado y único
  useEffect(() => {
    const handleConnect = () => console.log("Socket Conectado:", socket.id);
    const handleDisconnect = () => console.log("Socket Desconectado");

    const handleNewMessage = (message: ChatMessage) => {
      console.log("Mensaje recibido globalmente en App.tsx:", message);

      // 1. Notifica al ChatStore para actualizar el inbox
      useChatStore
        .getState()
        .updateChatWithNewMessage(
          message.chatId,
          message.message,
          message.senderId
        );

      // 2. Notifica al ChatMessageStore para añadir el mensaje si el chat está activo
      useChatMessageStore.getState().addMessage(message);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("message_from_server", handleNewMessage);

    // Función de limpieza para evitar listeners duplicados
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("message_from_server", handleNewMessage);
    };
  }, []); // El array vacío asegura que esto se ejecute solo una vez.

  return <AppRouter />;
}

export default App;
