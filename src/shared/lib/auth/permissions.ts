import { ProtectedRoute, PROTECTED_ROUTES } from "@/shared/constants/routes";

export type UserRole = 'ADMIN' | 'TECHNICAL' | 'AUDITOR' | 'USER';

export const ROLE_PERMISSIONS : Record<UserRole, ProtectedRoute[]> = {
    ADMIN : [
        PROTECTED_ROUTES.DASHBOARD,
        PROTECTED_ROUTES.TICKETS,
        PROTECTED_ROUTES.REPORTS,
        PROTECTED_ROUTES.ASSETS,
        PROTECTED_ROUTES.USERS,
    ],
    TECHNICAL: [
        PROTECTED_ROUTES.DASHBOARD,
        PROTECTED_ROUTES.TICKETS,
        PROTECTED_ROUTES.ASSETS,
    ],
    AUDITOR: [
        PROTECTED_ROUTES.DASHBOARD,
        PROTECTED_ROUTES.TICKETS,
    ],
    USER: [
        PROTECTED_ROUTES.DASHBOARD,
        PROTECTED_ROUTES.TICKETS,
    ],
};
export const hasRoutePermission = ( role: UserRole, route: string) : boolean => {
    const allowedRoutes = ROLE_PERMISSIONS[role];
    if(!allowedRoutes) return false;
    return allowedRoutes.some( allowedRoute => route.startsWith(allowedRoute));
};
