export type NotificationType = 
  | "TICKET_CREATED"
  | "TICKET_UPDATED"
  | "TICKET_ASSIGNED"
  | "TICKET_RESOLVED"
  | "TICKET_CLOSED"
  | "DIAGNOSIS_COMPLETE"
  | "SYSTEM_ALERT";

export type NotificationPriority = "low" | "medium" | "high";

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  ticketId?: string;
  read: boolean;
  timestamp: string;
  metadata?: Record<string, unknown>;
};

export type NotificationPayload = {
  type: NotificationType;
  title: string;
  message: string;
  priority?: NotificationPriority;
  ticketId?: string;
  metadata?: Record<string, unknown>;
};

export type StompConnectionConfig = {
  brokerUrl: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatIncoming?: number;
  heartbeatOutgoing?: number;
};

export type NotificationSubscription = {
  destination: string;
  callback: (notification: NotificationPayload) => void;
};