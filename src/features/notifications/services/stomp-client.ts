"use client";

import { Client, IMessage } from "@stomp/stompjs";
import { env } from "@/lib/env";
import type { NotificationPayload, StompConnectionConfig } from "../types/notification.types";

type MessageHandler = (payload: NotificationPayload) => void;

class StompClientService {
  private client: Client | null = null;
  private subscriptions = new Map<string, number>();
  private messageHandlers = new Map<string, MessageHandler[]>();
  private isConnected = false;
  private isConnecting = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;
  private authToken: string | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  private defaultConfig: StompConnectionConfig = {
    brokerUrl: `${env.wsUrl}/ws`,
    reconnectInterval: 5000,
    maxReconnectAttempts: 5,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
  };

  configure(config: Partial<StompConnectionConfig>): void {
    this.defaultConfig = { ...this.defaultConfig, ...config };
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  connect(token?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve();
        return;
      }

      if (this.isConnecting) {
        const checkConnection = setInterval(() => {
          if (this.isConnected) {
            clearInterval(checkConnection);
            resolve();
          }
        }, 100);
        return;
      }

      this.isConnecting = true;
      if (token) {
        this.authToken = token;
      }

      const stompConfig = {
        brokerURL: this.defaultConfig.brokerUrl,
        connectHeaders: {
          Authorization: `Bearer ${this.authToken}`,
        },
        heartbeatIncoming: this.defaultConfig.heartbeatIncoming,
        heartbeatOutgoing: this.defaultConfig.heartbeatOutgoing,
        reconnectCallback: () => this.handleReconnect(),
        onDisconnect: () => {
          this.isConnected = false;
          this.isConnecting = false;
        },
        onConnect: () => {
          this.isConnected = true;
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.resubscribeAll();
          resolve();
        },
        onStompError: (frame: { headers: Record<string, string> }) => {
          console.error("STOMP error:", frame.headers["message"]);
          this.isConnecting = false;
          reject(new Error(frame.headers["message"]));
        },
      };

      this.client = new Client(stompConfig);
      this.client.activate();
    });
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.client) {
      this.subscriptions.forEach((_, dest) => this.client?.unsubscribe(dest));
      this.subscriptions.clear();
      this.client.deactivate();
      this.client = null;
    }

    this.isConnected = false;
    this.isConnecting = false;
    this.messageHandlers.clear();
    this.authToken = null;
  }

  subscribe(destination: string, handler: MessageHandler): void {
    if (!this.client || !this.isConnected) {
      const handlers = this.messageHandlers.get(destination) || [];
      handlers.push(handler);
      this.messageHandlers.set(destination, handlers);
      return;
    }

    const subscription = this.client.subscribe(destination, (message: IMessage) => {
      try {
        const payload: NotificationPayload = JSON.parse(message.body);
        handler(payload);
      } catch (error) {
        console.error("Failed to parse notification:", error);
      }
    });

    this.subscriptions.set(destination, subscription.id);
    const handlers = this.messageHandlers.get(destination) || [];
    handlers.push(handler);
    this.messageHandlers.set(destination, handlers);
  }

  unsubscribe(destination: string): void {
    if (this.client && this.subscriptions.has(destination)) {
      this.client.unsubscribe(destination);
      this.subscriptions.delete(destination);
      this.messageHandlers.delete(destination);
    }
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      this.disconnect();
      return;
    }

    this.reconnectAttempts++;
    console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);

    this.reconnectTimer = setTimeout(() => {
      this.connect().catch((error) => {
        console.error("Reconnection failed:", error);
      });
    }, this.reconnectInterval);
  }

  private resubscribeAll(): void {
    this.messageHandlers.forEach((handlers, destination) => {
      if (!this.subscriptions.has(destination)) {
        const subscription = this.client?.subscribe(destination, (message: IMessage) => {
          try {
            const payload: NotificationPayload = JSON.parse(message.body);
            handlers.forEach((handler) => handler(payload));
          } catch (error) {
            console.error("Failed to parse notification:", error);
          }
        });
        if (subscription) {
          this.subscriptions.set(destination, subscription.id);
        }
      }
    });
  }

  get connectionStatus(): boolean {
    return this.isConnected;
  }

  get connectionAttempts(): number {
    return this.reconnectAttempts;
  }
}

export const stompClient = new StompClientService();