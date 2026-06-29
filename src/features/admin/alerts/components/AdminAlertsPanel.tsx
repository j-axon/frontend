"use client";

import * as React from "react";
import {
  useNotificationsSelector,
  useWebSocketNotifications
} from "@features/notifications/hooks/useRealtimeNotifications";
import { Badge } from "@shared/components/ui/Badge";

export function AdminAlertsPanel() {
  const { markAsRead } = useWebSocketNotifications();
  const notifications = useNotificationsSelector((s) =>
    s.notifications.filter(
      (n) =>
        n.type === "ADMIN_ALERT" ||
        n.type === "ASSET_ORPHAN_DETECTED" ||
        n.type === "SYSTEM_ALERT"
    )
  );

  if (notifications.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-bg-soft px-6 py-6 text-center text-sm text-fg-soft">
        Aún no se han recibido alertas administrativas.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {notifications.map((n) => (
        <li
          key={n.id}
          className={`rounded-md border border-border bg-bg-soft px-4 py-3 ${
            n.read ? "opacity-70" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Badge
                  tone={
                    n.severity === "ERROR"
                      ? "danger"
                      : n.severity === "WARNING"
                      ? "warning"
                      : "info"
                  }
                >
                  {n.type}
                </Badge>
                <span className="text-xs text-fg-soft">
                  {new Date(n.receivedAt).toLocaleString()}
                </span>
              </div>
              <p className="font-semibold">{n.title}</p>
              <p className="text-sm text-fg-soft">{n.message}</p>
            </div>
            <button
              onClick={() => markAsRead(n.id)}
              className="text-xs text-accent hover:underline"
            >
              Marcar leída
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
