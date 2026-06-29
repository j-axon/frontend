"use client";

import * as React from "react";
import { create } from "zustand";
import { hasRole } from "@/constants/roles";
import {
  stompClient,
  type StompConnectionState
} from "@features/notifications/services/stompClient";
import {
  type ClientNotification,
  type NotificationPayload
} from "@features/notifications/types/notification.types";

type NotificationsState = {
  notifications: ClientNotification[];
  connection: StompConnectionState;
  addNotification: (payload: NotificationPayload) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clear: () => void;
};

const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  connection: "IDLE",
  addNotification: (payload) =>
    set((state) => ({
      notifications: [
        {
          ...payload,
          read: false,
          receivedAt: new Date().toISOString()
        },
        ...state.notifications
      ].slice(0, 100)
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true }))
    })),
  clear: () => set({ notifications: [] })
}));

import { useCurrentUser } from "@features/auth/hooks/useCurrentUser";

export function useWebSocketNotifications() {
  const { user, isAuthenticated } = useCurrentUser();
  const connection = useNotificationsStore((s) => s.connection);
  const setConnectionState = (state: StompConnectionState) => {
    useNotificationsStore.setState({ connection: state });
  };

  React.useEffect(() => {
    if (!isAuthenticated || !user) return;

    const unsubState = stompClient.onStateChange(setConnectionState);
    stompClient.connect();

    const subscriptions: Array<() => void> = [];

    // /user/queue/tickets — siempre para usuarios autenticados
    subscriptions.push(
      stompClient.subscribe<NotificationPayload>(
        "/user/queue/tickets",
        (payload) => useNotificationsStore.getState().addNotification(payload)
      )
    );

    if (hasRole(user.roles, ["TECNICO", "ADMIN"])) {
      subscriptions.push(
        stompClient.subscribe<NotificationPayload>(
          "/topic/tickets/technicians",
          (payload) => useNotificationsStore.getState().addNotification(payload)
        )
      );
    }

    if (hasRole(user.roles, "ADMIN")) {
      subscriptions.push(
        stompClient.subscribe<NotificationPayload>(
          "/topic/admin/alerts",
          (payload) => useNotificationsStore.getState().addNotification(payload)
        )
      );
    }

    return () => {
      subscriptions.forEach((u) => u());
      unsubState();
    };
  }, [isAuthenticated, user]);

  return {
    connection,
    notifications: useNotificationsStore((s) => s.notifications),
    markAsRead: useNotificationsStore((s) => s.markAsRead),
    markAllAsRead: useNotificationsStore((s) => s.markAllAsRead),
    clear: useNotificationsStore((s) => s.clear)
  };
}

export function useNotificationsSelector<T>(selector: (s: NotificationsState) => T): T {
  return useNotificationsStore(selector);
}

export { useNotificationsStore };

