"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  useWebSocketNotifications,
  useNotificationsSelector
} from "@features/notifications/hooks/useRealtimeNotifications";

export function NotificationToast() {
  const { markAsRead, markAllAsRead, clear } = useWebSocketNotifications();
  const notifications = useNotificationsSelector((s) => s.notifications);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 w-full max-w-sm">
      <div className="pointer-events-auto rounded-xl border border-border bg-bg-soft shadow-lg shadow-black/40">
        <header className="flex items-center justify-between border-b border-border px-4 py-2">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex flex-1 items-center justify-between text-left"
            aria-expanded={open}
          >
            <span className="font-semibold">Notificaciones</span>
            <span className="text-xs text-fg-soft">
              {notifications.filter((n) => !n.read).length} sin leer
            </span>
          </button>
          <div className="flex items-center gap-1">
            <button
              className="rounded p-1 text-xs text-fg-soft hover:bg-muted"
              onClick={() => markAllAsRead()}
            >
              ✓
            </button>
            <button
              className="rounded p-1 text-xs text-fg-soft hover:bg-muted"
              onClick={() => clear()}
            >
              🗑
            </button>
          </div>
        </header>

        {open && (
          <ul className="scrollbar-thin max-h-80 overflow-y-auto">
            {notifications.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-fg-soft">
                Sin notificaciones por ahora.
              </li>
            )}
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`border-b border-border px-4 py-3 last:border-b-0 ${
                  n.read ? "bg-transparent" : "bg-brand/5"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-fg">{n.title}</p>
                    <p className="mt-0.5 text-xs text-fg-soft">{n.message}</p>
                    {n.link && (
                      <button
                        onClick={() => {
                          markAsRead(n.id);
                          router.push(n.link!);
                        }}
                        className="mt-1 text-xs text-accent hover:underline"
                      >
                        Ver detalles →
                      </button>
                    )}
                  </div>
                  <button
                    aria-label="Marcar como leída"
                    onClick={() => markAsRead(n.id)}
                    className="text-xs text-fg-soft hover:text-fg"
                  >
                    ···
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
