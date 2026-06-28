export function useWebSocket() {
  // Hook inicial para notificaciones en tiempo real.
  return {
    connected: false
  };
}

// Compat alias: MyTicketsList (companion code) expects this name.
export function useWebSocketSubscription(_args: unknown) {
  return useWebSocket();
}