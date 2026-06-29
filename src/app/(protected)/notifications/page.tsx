"use client";

import * as React from "react";
import {
  useWebSocketNotifications,
  useNotificationsSelector
} from "@features/notifications/hooks/useRealtimeNotifications";

export default function NotificationsPage() {
  return <Content />;
}

function Content() {
  const { markAsRead, markAllAsRead, clear } = useWebSocketNotifications();
  const notifications = useNotificationsSelector((s) => s.notifications);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-fg">Notificaciones</h1>
          <p className="text-sm text-fg-soft">
            Eventos en tiempo real recibidos desde el backend.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => markAllAsRead()}
            className="rounded-md border border-border bg-bg-soft px-3 py-2 text-sm hover:bg-muted"
          >
            Marcar todas leídas
          </button>
          <button
            onClick={() => clear()}
            className="rounded-md border border-border bg-bg-soft px-3 py-2 text-sm hover:bg-muted"
          >
            Limpiar
          </button>
        </div>
      </header>

      {notifications.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-bg-soft px-6 py-10 text-center">
          <p className="text-lg font-semibold">Sin notificaciones</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`rounded-md border border-border bg-bg-soft px-4 py-3 ${
                n.read ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{n.title}</p>
                  <p className="text-sm text-fg-soft">{n.message}</p>
                  <p className="mt-1 text-xs text-fg-soft">
                    {new Date(n.receivedAt).toLocaleString()}
                  </p>
                </div>
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="text-xs text-accent hover:underline"
                  >
                    Marcar leída
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
