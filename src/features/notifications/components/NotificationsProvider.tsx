"use client";

import * as React from "react";
import { useWebSocketNotifications } from "@features/notifications/hooks/useRealtimeNotifications";
import { NotificationToast } from "./NotificationToast";
import { useToast } from "@shared/components/feedback/ToastProvider";
import type { ClientNotification } from "@features/notifications/types/notification.types";

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const { notifications } = useWebSocketNotifications();
  const { push } = useToast();
  const seen = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    for (const n of notifications) {
      if (seen.current.has(n.id)) continue;
      seen.current.add(n.id);
      // No notificar al cargar todas de golpe: solo las nuevas
      if (Date.now() - new Date(n.receivedAt).getTime() < 6000) {
        push({
          title: n.title,
          description: n.message,
          variant: severityToVariant(n.severity)
        });
      }
    }
  }, [notifications, push]);

  return (
    <>
      {children}
      <NotificationToast />
    </>
  );
}

function severityToVariant(s: ClientNotification["severity"]) {
  if (s === "ERROR") return "error" as const;
  if (s === "WARNING") return "warning" as const;
  if (s === "SUCCESS") return "success" as const;
  return "info" as const;
}
