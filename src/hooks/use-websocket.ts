"use client";

import { useEffect, useState } from "react";
import { createWebSocket } from "@/lib/websocket/ws-client";

type UseWebSocketOptions = {
  path: string;
  onMessage?: (event: MessageEvent) => void;
};

export function useWebSocket() {
  // Hook legado sin parametros para no romper llamadas antiguas.
  return {
    connected: false
  };
}

export function useWebSocketSubscription(options: UseWebSocketOptions) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = createWebSocket(options.path);

    socket.onopen = () => {
      setConnected(true);
    };

    socket.onclose = () => {
      setConnected(false);
    };

    socket.onmessage = (event) => {
      options.onMessage?.(event);
    };

    return () => {
      socket.close();
    };
  }, [options.path, options.onMessage]);

  return { connected };
}
