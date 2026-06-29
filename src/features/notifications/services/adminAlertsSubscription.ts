"use client";

import { useEffect } from "react";
import { stompClient } from "./stompClient";
import { useNotificationsStore } from "@features/notifications/hooks/useRealtimeNotifications";
import { hasRole } from "@/constants/roles";
import { useCurrentUser } from "@features/auth/hooks/useCurrentUser";
import { useToast } from "@shared/components/feedback/ToastProvider";
import type { NotificationPayload } from "@features/notifications/types/notification.types";

/** Hook de suscripción dedicado a alertas administrativas. */
export function useAdminAlertsSubscription() {
  const { user, isAuthenticated } = useCurrentUser();
  const toast = useToast();
  const addNotification = useNotificationsStore((s) => s.addNotification);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    if (!hasRole(user.roles, "ADMIN")) return;

    const unsubscribe = stompClient.subscribe<NotificationPayload>(
      "/topic/admin/alerts",
      (payload) => {
        addNotification(payload);
        toast.push({
          title: payload.title,
          description: payload.message,
          variant:
            payload.severity === "ERROR"
              ? "error"
              : payload.severity === "WARNING"
              ? "warning"
              : "info"
        });
      }
    );
    return () => unsubscribe();
  }, [isAuthenticated, user, addNotification, toast]);
}
