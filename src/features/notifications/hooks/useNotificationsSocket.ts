"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { stompClient, subscribeToUserNotifications, unsubscribeFromUserNotifications } from "../services/stomp-client";
import type { Notification, NotificationPayload } from "../types/notification.types";
import { useAuth } from "@/hooks/use-auth";

const MAX_NOTIFICATIONS = 50;

export function useNotificationsSocket() {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const userIdRef = useRef<string | null>(null);

  const handleNotification = useCallback((payload: NotificationPayload) => {
    const now = new Date().toISOString();
    const notification: Notification = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: payload.type,
      title: payload.title,
      message: payload.message,
      priority: payload.priority || "MEDIUM",
      ticketId: payload.ticketId,
      ticketCode: payload.ticketCode,
      read: false,
      timestamp: now,
      createdAt: now,
      metadata: payload.metadata,
    };

    setNotifications((prev) => {
      const updated = [notification, ...prev];
      return updated.slice(0, MAX_NOTIFICATIONS);
    });
  }, []);

  const connect = useCallback(async () => {
    if (!user?.id) return;

    try {
      setConnectionError(null);
      await stompClient.connect();
      subscribeToUserNotifications(user.id, handleNotification);
      setIsConnected(true);
      userIdRef.current = user.id;
    } catch (error) {
      setConnectionError(error instanceof Error ? error.message : "Connection failed");
      setIsConnected(false);
    }
  }, [user?.id, handleNotification]);

  const disconnect = useCallback(() => {
    if (userIdRef.current) {
      unsubscribeFromUserNotifications(userIdRef.current);
    }
    stompClient.disconnect();
    setIsConnected(false);
    userIdRef.current = null;
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [isAuthenticated, user?.id, connect, disconnect]);

  return {
    notifications,
    isConnected,
    connectionError,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    unreadCount: notifications.filter((n) => !n.read).length,
  };
}