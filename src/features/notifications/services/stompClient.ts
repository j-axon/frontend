"use client";

import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { env } from "@shared/lib/env";
import { tokenMemoryStore } from "@features/auth/utils/tokenMemoryStore";

export type StompConnectionState = "IDLE" | "CONNECTING" | "OPEN" | "CLOSED" | "ERROR";

type Listener = (state: StompConnectionState) => void;

class StompClientImpl {
  private client: Client | null = null;
  private state: StompConnectionState = "IDLE";
  private listeners = new Set<Listener>();
  private subscriptions = new Map<string, { subscription: StompSubscription; topic: string }>();
  private retry = 0;

  connect(): void {
    if (this.client && (this.state === "CONNECTING" || this.state === "OPEN")) return;

    const token = tokenMemoryStore.get();
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    this.setState("CONNECTING");

    const client = new Client({
      brokerURL: env.wsUrl,
      connectHeaders: headers,
      reconnectDelay: 5000 + this.retry * 2000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: () => undefined
    });

    client.onConnect = () => {
      this.retry = 0;
      this.setState("OPEN");
      // Re-suscribir a los tópicos guardados
      for (const [key, sub] of this.subscriptions.entries()) {
        const newSub = client.subscribe(sub.topic, (message) => {
          this.dispatchers.get(key)?.(message);
        });
        sub.subscription = newSub;
      }
    };

    client.onWebSocketClose = () => this.setState("CLOSED");
    client.onStompError = () => {
      this.retry = Math.min(this.retry + 1, 5);
      this.setState("ERROR");
    };

    client.activate();
    this.client = client;
  }

  disconnect(): void {
    this.subscriptions.forEach((s) => s.subscription.unsubscribe());
    this.subscriptions.clear();
    this.dispatchers.clear();
    this.client?.deactivate();
    this.client = null;
    this.setState("CLOSED");
  }

  subscribe<T = unknown>(
    topic: string,
    handler: (payload: T) => void
  ): () => void {
    const key = `${topic}::${Math.random().toString(36).slice(2, 6)}`;
    this.dispatchers.set(key, (message: IMessage) => {
      try {
        const parsed = JSON.parse(message.body) as T;
        handler(parsed);
      } catch {
        // ignore
      }
    });

    if (this.client && this.state === "OPEN") {
      const subscription = this.client.subscribe(topic, (msg) =>
        this.dispatchers.get(key)?.(msg)
      );
      this.subscriptions.set(key, { subscription, topic });
    } else {
      // place-holder: se suscribirá al conectar
      this.subscriptions.set(key, {
        subscription: { unsubscribe: () => undefined } as StompSubscription,
        topic
      });
    }

    return () => {
      const sub = this.subscriptions.get(key);
      sub?.subscription.unsubscribe();
      this.subscriptions.delete(key);
      this.dispatchers.delete(key);
    };
  }

  onStateChange(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  getState(): StompConnectionState {
    return this.state;
  }

  // Mapa interno de dispatchers
  private dispatchers = new Map<string, (msg: IMessage) => void>();

  private setState(state: StompConnectionState) {
    this.state = state;
    this.listeners.forEach((l) => l(state));
  }
}

export const stompClient = new StompClientImpl();
