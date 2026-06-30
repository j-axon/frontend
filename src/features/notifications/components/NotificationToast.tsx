"use client";

import { useEffect, useState } from "react";
import type { Notification } from "../types/notification.types";

export type NotificationToastProps = {
  notification: Notification;
  onDismiss: () => void;
  duration?: number;
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

function getPriorityStyles(priority: string | undefined): { bg: string; border: string; icon: string } {
  const styles: Record<string, { bg: string; border: string; icon: string }> = {
    HIGH: { bg: "bg-red-50", border: "border-l-4 border-l-red-500", icon: "text-red-500" },
    URGENT: { bg: "bg-red-50", border: "border-l-4 border-l-red-500", icon: "text-red-500" },
    MEDIUM: { bg: "bg-yellow-50", border: "border-l-4 border-l-yellow-500", icon: "text-yellow-500" },
    LOW: { bg: "bg-gray-50", border: "border-l-4 border-l-gray-400", icon: "text-gray-500" },
  };
  return styles[priority ?? "LOW"] || styles.LOW;
}

export function NotificationToast({
  notification,
  onDismiss,
  duration = 5000,
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const styles = getPriorityStyles(notification.priority);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        onDismiss();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const handleDismiss = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`pointer-events-auto fixed right-4 top-4 z-50 w-80 rounded-r-lg shadow-lg transition-all duration-300 ${styles.bg} ${styles.border} ${
        isLeaving ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <span className={`text-2xl ${styles.icon}`}>
          {getNotificationIcon(notification.type)}
        </span>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            {notification.title}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            {notification.message}
          </p>
        </div>

        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}