import { useEffect, useRef, useState, useCallback } from 'react';

interface UsePongWebSocketProps {
  url?: string;
  onMessage?: (data: string) => void;
  onError?: (error: Event) => void;
  autoConnect?: boolean;
}

interface UsePongWebSocketReturn {
  isConnected: boolean;
  sendMessage: (message: string) => void;
  connect: () => void;
  disconnect: () => void;
  lastMessage: string | null;
}

export const usePongWebSocket = ({
  url = 'http://localhost:8000/ws/pong',
  onMessage,
  onError,
  autoConnect = true,
}: UsePongWebSocketProps = {}): UsePongWebSocketReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<number | null>(null);

  const onMessageRef = useRef(onMessage);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected');
      return;
    }

    try {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        console.log('Received message:', event.data);
        setLastMessage(event.data);

        // call latest callback
        onMessageRef.current?.(event.data);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        onErrorRef.current?.(error);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);

        reconnectTimeout.current = window.setTimeout(connect, 10000);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
    }
  }, [url]); // only depends on URL

  const disconnect = useCallback(() => {
    if (reconnectTimeout.current !== null) {
      window.clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
      console.log('Sent message:', message);
    } else {
      console.error('WebSocket is not connected');
    }
  }, []);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    isConnected,
    sendMessage,
    connect,
    disconnect,
    lastMessage,
  };
};
