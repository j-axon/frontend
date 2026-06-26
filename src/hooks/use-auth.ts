export function useAuth() {
  // Initial hook. Implement session reading, silent refresh, and logout.
  return {
    user: null,
    isAuthenticated: false
  };
}
