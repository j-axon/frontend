export const PUBLIC_ROUTES = {
    HOME: '/',
    LOGIN : '/Login',
} as const;

export const PROTECTED_ROUTES = {
    DASHBOARD: '/dashboard' , 
    TICKETS : '/tickets',
    REPORTS: '/reports',
    ASSETS : '/assets',
    USERS: '/users',
    UNATHORIZED : '/403',
} as const;

export type PublicRoute = typeof PUBLIC_ROUTES[keyof typeof PUBLIC_ROUTES];
export type ProtectedRoute = typeof PROTECTED_ROUTES[keyof typeof PROTECTED_ROUTES];