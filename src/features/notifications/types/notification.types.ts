export type NotificationSeverity = "INFO" | "WARNING" | "ERROR" | "SUCCESS";

export type NotificationType =
  | "TICKET_CREATED"
  | "TICKET_UPDATED"
  | "TICKET_ASSIGNED"
  | "TICKET_RESOLVED"
  | "ASSET_ORPHAN_DETECTED"
  | "ADMIN_ALERT"
  | "SYSTEM_ALERT"
  | "AI_DIAGNOSIS_READY";

export type NotificationPayload = {
  id: string;
  type: NotificationType;
  severity: NotificationSeverity;
  title: string;
  message: string;
  createdAt: string; // ISO
  link?: string;
  metadata?: Record<string, unknown>;
};

export type RealtimeNotificationPayload = NotificationPayload;

export type ClientNotification = NotificationPayload & {
  read: boolean;
  receivedAt: string;
};
