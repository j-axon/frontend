export type AuditAction = 
  | "LOGIN" 
  | "LOGOUT" 
  | "TICKET_CREATE" 
  | "TICKET_UPDATE" 
  | "TICKET_DELETE" 
  | "ASSET_CREATE" 
  | "ASSET_UPDATE" 
  | "ASSET_DELETE"
  | "REPORT_VIEW";

export type AuditLog = {
  id: string;
  userId: string;
  userName: string;
  action: AuditAction;
  entityType: "TICKET" | "ASSET" | "USER" | "REPORT";
  entityId?: string;
  details?: string;
  ipAddress: string;
  timestamp: string;
};

export type AuditFilters = {
  userId?: string;
  action?: AuditAction;
  entityType?: "TICKET" | "ASSET" | "USER" | "REPORT";
  startDate?: string;
  endDate?: string;
};

export type AuditLogsResponse = {
  data: AuditLog[];
  total: number;
  page: number;
  pageSize: number;
};