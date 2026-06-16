export function useAuth() {
  // Hook inicial. Implementar lectura de sesión, refresh silencioso y logout.
  return {
    user: null,
    isAuthenticated: false
  };
}
