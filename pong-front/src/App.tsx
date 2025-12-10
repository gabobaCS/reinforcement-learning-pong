import { useEffect } from 'react';
import './App.css'
import { usePongWebSocket } from "@/hooks/usePongWebSocket";
import { Canvas } from './canvas';

function App() {
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
    <div style={{
      margin: 0,
      background: '#111',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      <div style={{ color: 'white', marginBottom: '1rem' }}>
        {lastMessage && `WebSocket: ${lastMessage}`}
      </div>
      <Canvas />
    </div>
  )
}

export default App
