// Minimal shape que necesitan los hooks que lo consumen (notifications, etc.).
// La implementación real (FE-002 en el README) está pendiente; este stub
// devuelve usuario nulo pero con tipo correcto para que TS compile.
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: ReadonlyArray<string>;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

export function useAuth(): AuthState {
  // Hook inicial. Implementar lectura de sesión, refresh silencioso y logout.
  return {
    user: null,
    isAuthenticated: false
  };
}
