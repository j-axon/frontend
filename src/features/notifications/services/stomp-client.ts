import { Client, IFrame, IMessage, StompSubscription } from "@stomp/stompjs";
import { env } from "@/lib/env";
import type { NotificationPayload, StompMessage } from "@/features/notifications/types/notification.types";

type StompClientConfig = {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onMessage?: (message: StompMessage) => void;
  onError?: (error: IFrame) => void;
};

class StompClientManager {
  private client: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 5000;

  connect(config: StompClientConfig) {
    if (this.client && this.client.connected) {
      return;
    }

    this.client = new Client({
      brokerURL: env.wsUrl.replace("ws://", "ws://").replace("wss://", "wss://"),
      reconnectDelay: this.reconnectDelay,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("STOMP client connected");
        this.reconnectAttempts = 0;
        config.onConnect?.();
      },
      onDisconnect: () => {
        console.log("STOMP client disconnected");
        config.onDisconnect?.();
      },
      onStompError: (frame: IFrame) => {
        console.error("STOMP error:", frame);
        config.onError?.(frame);
      },
      onWebSocketClose: () => {
        this.handleReconnect(config);
      }
    });

    this.client.activate();
  }

  private handleReconnect(config: StompClientConfig) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      setTimeout(() => {
        this.connect(config);
      }, this.reconnectDelay);
    } else {
      console.error("Max reconnection attempts reached");
    }
  }

  subscribe(destination: string, callback: (message: StompMessage) => void) {
    if (!this.client || !this.client.connected) {
      console.warn("STOMP client not connected, cannot subscribe");
      return;
    }

    const subscription = this.client.subscribe(destination, (message: IMessage) => {
      try {
        const parsed = JSON.parse(message.body) as StompMessage;
        callback(parsed);
      } catch (error) {
        console.error("Error parsing STOMP message:", error);
      }
    });

    this.subscriptions.set(destination, subscription);
  }

  unsubscribe(destination: string) {
    const subscription = this.subscriptions.get(destination);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(destination);
    }
  }

  disconnect() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions.clear();
    
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
  }

  isConnected(): boolean {
    return this.client?.connected ?? false;
  }
}

export const stompClientManager = new StompClientManager();

/**
 * Backwards-compatible API expected by useNotificationsSocket.
 * The newer `stompClientManager` takes a config object; the legacy helpers
 * here keep the imperative signature used by hooks.
 */
export const stompClient = {
  connect(): Promise<void> {
    stompClientManager.connect({});
    return Promise.resolve();
  },
  disconnect(): void {
    stompClientManager.disconnect();
  },
  isConnected(): boolean {
    return stompClientManager.isConnected();
  },
};

const notificationHandlers = new Map<string, (message: IMessage) => void>();

export function subscribeToUserNotifications(
  userId: string,
  handler: (payload: NotificationPayload) => void
): void {
  const destination = `/user/queue/notifications/${userId}`;
  const wrapped = (message: IMessage) => {
    try {
      handler(JSON.parse(message.body) as NotificationPayload);
    } catch (error) {
      console.error("Error parsing user notification:", error);
    }
  };
  notificationHandlers.set(userId, wrapped);
  stompClientManager.subscribe(destination, wrapped as (message: unknown) => void);
}

export function unsubscribeFromUserNotifications(userId: string): void {
  const destination = `/user/queue/notifications/${userId}`;
  stompClientManager.unsubscribe(destination);
  notificationHandlers.delete(userId);
}
