import { authHandlers } from "./auth.handlers";
import { ticketsHandlers } from "./tickets.handlers";
import { assetsHandlers } from "./assets.handlers";

export const handlers = [
  ...authHandlers,
  ...ticketsHandlers,
  ...assetsHandlers
];
