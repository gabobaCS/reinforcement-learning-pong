import { useEffect } from 'react';
import './App.css'
import { usePongWebSocket } from "@/hooks/usePongWebSocket";

function App() {
  console.log("up")

  const { sendMessage, lastMessage, isConnected } = usePongWebSocket({
    onMessage: (msg) => {
      const data = JSON.parse(msg);
    }
  });

  useEffect(() => {
    if (isConnected) {
      sendMessage("hello");
    }
  }, [isConnected]);

  return (
    <>
      <div>
        {lastMessage}
      </div>
    </>
  )
}

export default App
