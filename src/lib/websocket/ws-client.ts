import { env } from "@/shared/lib/env";

export function createWebSocket(path: string): WebSocket {
  return new WebSocket(`${env.wsUrl}${path}`);
}
