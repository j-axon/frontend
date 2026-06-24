"use client";
import React,{createContext,useContext,useState} from "react";
import { authService } from "../services/auth.service";
import { setInMemoryToken } from "@/shared/lib/http/client";
import type { LoginDTO, UserSessionDTO } from "../types/auth.types";
import { promises } from "node:dns";

interface AuthContextType{
    user : UserSessionDTO['user'] | null;
    isAuthenticated : boolean;
    isLoading : boolean;
    loginUser: (Credential: LoginDTO) => Promise<void>;
    LogoutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children : React.ReactNode}> = ({children}) => {
    const [ user,setUser] = useState<UserSessionDTO ['user'] | null> (null);

    const[ isLoading, setIsloading] = useState(false);

    const loginUser = async (Credentials: LoginDTO) =>{
        setIsloading(true);
        try{
            const data = await authService.Login(Credentials);
            setInMemoryToken(data.accessToken);
            setUser(data.user);
        }catch(error){
            setInMemoryToken(null);
            throw error;
        }finally { 
            setIsloading(false);
        }
    };
    const LogoutUser = async() =>{
        try{
            await authService.logout();
        }finally{
            setInMemoryToken(null);
            setUser(null);
        }
    };
    return(
        <AuthContext.Provider value={{user, isAuthenticated: !!user, isLoading, loginUser, LogoutUser}}>
            {children}    </AuthContext.Provider>
    );
}