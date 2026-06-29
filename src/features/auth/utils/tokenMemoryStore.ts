/**
 * store SOLO en memoria para el access token.
 * El refresh token nunca debe leerse ni almacenarse en frontend:
 * viaja en cookie HttpOnly que el navegador envía automáticamente.
 */

let accessToken: string | null = null;

export const tokenMemoryStore = {
  get(): string | null {
    return accessToken;
  },
  set(token: string): void {
    accessToken = token;
  },
  clear(): void {
    accessToken = null;
  }
};
