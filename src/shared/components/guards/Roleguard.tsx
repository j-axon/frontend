"use client"; 
import React, {useEffect}  from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { hasRoutePermission, type UserRole } from "@/shared/lib/auth/permissions";
import { usePathname, useRouter } from "next/navigation";

interface RoleGuardProps{
    children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({children}) => {
    const {user,isLoading} = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if( isLoading) return;

        if (!user){
            router.replace("/login");
            return;
        }
        const userRole = user.role as UserRole;
        if( userRole &&!hasRoutePermission(userRole, pathname)){
            router.replace("/403");
        }
    },[user,isLoading, pathname, router]
);

    return <>{children}</>;
}

