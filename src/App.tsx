// src/App.tsx
import { useEffect } from "react";
import AppRouter from "./router";
import { useAuthStore } from "./store/AuthStore";
import { io } from "socket.io-client";

// Crea una instancia de socket que se pueda reutilizar
export const socket = io("http://localhost:3002");

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Maneja la conexión y desconexión del socket
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor de WebSockets");
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor de WebSockets");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return <AppRouter />;
}

export default App;
