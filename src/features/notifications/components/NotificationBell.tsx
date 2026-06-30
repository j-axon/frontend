"use client";

import { useState, useRef, useEffect } from "react";
import type { Notification } from "../types/notification.types";

export type NotificationBellProps = {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
};

function getNotificationIcon(type: string): string {
  const icons: Record<string, string> = {
    TICKET_CREATED: "🎫",
    TICKET_UPDATED: "✏️",
    TICKET_ASSIGNED: "👤",
    TICKET_RESOLVED: "✅",
    TICKET_CLOSED: "🔒",
    DIAGNOSIS_COMPLETE: "🤖",
    SYSTEM_ALERT: "⚠️",
  };
  return icons[type] || "📢";
}

function getPriorityColor(priority: string | undefined): string {
  const colors: Record<string, string> = {
    HIGH: "bg-red-100 border-red-300",
    URGENT: "bg-red-100 border-red-300",
    MEDIUM: "bg-yellow-100 border-yellow-300",
    LOW: "bg-gray-100 border-gray-200",
  };
  return colors[priority ?? "LOW"] || colors.LOW;
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Ahora";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  
  return date.toLocaleDateString("es-CO");
}

export function NotificationBell({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onRemove,
  onClearAll,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100"
        aria-label="Notificaciones"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border bg-white shadow-lg">
          <div className="flex items-center justify-between border-b p-3">
            <h3 className="font-semibold text-gray-900">Notificaciones</h3>
            {unreadCount > 0 && (
              <button onClick={onMarkAllAsRead} className="text-sm text-blue-600 hover:text-blue-800">
                Marcar todo leído
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No hay notificaciones</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`cursor-pointer border-b p-3 transition-colors hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""} ${getPriorityColor(notification.priority)}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium text-gray-900">{notification.title}</p>
                        <button onClick={(e) => { e.stopPropagation(); onRemove(notification.id); }} className="ml-2 text-gray-400 hover:text-gray-600">×</button>
                      </div>
                      <p className="truncate text-xs text-gray-600">{notification.message}</p>
                      <p className="mt-1 text-xs text-gray-400">{formatTime(notification.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="border-t p-2 text-center">
              <button onClick={onClearAll} className="text-sm text-red-600 hover:text-red-800">
                Limpiar todas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}