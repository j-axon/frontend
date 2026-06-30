export type NotificationType = "TICKET_UPDATED" | "TICKET_ASSIGNED" | "AI_DIAGNOSIS_READY" | "TICKET_CLOSED";

export type NotificationPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  ticketId?: string;
  ticketCode?: string;
  createdAt: string;
  timestamp: string;  // alias para createdAt; los componentes del STOMP usan .timestamp
  priority?: NotificationPriority;  // opcional: lo setean componentes UI, no viene del backend
  metadata?: Record<string, unknown>;
  read: boolean;
};

export type StompMessage = {
  type: NotificationType;
  payload: {
    ticketId?: string;
    ticketCode?: string;
    userId?: string;
    message?: string;
  };
  timestamp: string;
};

/**
 * Payload shape consumed by useNotificationsSocket when a STOMP message arrives.
 * Distinct from {@link StompMessage} (which is the wire envelope) and
 * {@link Notification} (which is the local UI model after enrichment).
 */
export interface NotificationPayload {
  type: NotificationType;
  title: string;
  message: string;
  priority?: NotificationPriority;
  ticketId?: string;
  ticketCode?: string;
  metadata?: Record<string, unknown>;
}
