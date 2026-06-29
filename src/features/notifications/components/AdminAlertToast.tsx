"use client";

import * as React from "react";
import { useAdminAlertsSubscription } from "@features/notifications/services/adminAlertsSubscription";

export function AdminAlertToast() {
  useAdminAlertsSubscription();
  return null;
}
