import { RoleGuard  } from "@/shared/components/guards/Roleguard";
 

interface ProtectedLayoutProps{
    children: React.ReactNode;
}

export default function ProtectedLayout({children} : ProtectedLayoutProps){
    return(
    <RoleGuard>
        {children}
    </RoleGuard> 
    );
} 