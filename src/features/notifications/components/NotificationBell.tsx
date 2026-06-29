"use client";

import * as React from "react";
import Link from "next/link";
import {
  useWebSocketNotifications,
  useNotificationsSelector
} from "@features/notifications/hooks/useRealtimeNotifications";

export function NotificationBell() {
  const { markAsRead } = useWebSocketNotifications();
  const unread = useNotificationsSelector(
    (s) => s.notifications.filter((n) => !n.read).length
  );
  const notifications = useNotificationsSelector((s) => s.notifications);

  return (
    <div className="relative">
      <button
        aria-label={`Notificaciones${unread ? ` (${unread} sin leer)` : ""}`}
        className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-soft hover:bg-muted"
        onClick={() => notifications.filter((n) => !n.read).forEach((n) => markAsRead(n.id))}
      >
        🔔
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs font-bold text-white">
            {unread}
          </span>
        )}
      </button>
      <Link href="/notifications" className="sr-only">
        Ver notificaciones
      </Link>
    </div>
  );
}
