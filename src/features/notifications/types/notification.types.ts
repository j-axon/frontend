export type NotificationType = "TICKET_UPDATED" | "TICKET_ASSIGNED" | "AI_DIAGNOSIS_READY" | "TICKET_CLOSED";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  ticketId?: string;
  ticketCode?: string;
  createdAt: string;
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
