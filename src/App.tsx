import { useEffect } from "react";
import AppRouter from "./router";
import { useAuthStore } from "./store/AuthStore";

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return <AppRouter />;
}

export default App;
