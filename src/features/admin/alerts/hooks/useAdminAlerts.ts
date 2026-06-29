"use client";

import { useNotificationsSelector } from "@features/notifications/hooks/useRealtimeNotifications";

export function useAdminAlerts() {
  const alerts = useNotificationsSelector((s) =>
    s.notifications.filter((n) =>
      ["ADMIN_ALERT", "ASSET_ORPHAN_DETECTED", "SYSTEM_ALERT"].includes(n.type)
    )
  );
  return { alerts, count: alerts.length };
}
