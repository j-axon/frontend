import { httpClient } from '@/shared/lib/http/client';
import type { LoginDTO, UserSessionDTO } from "../types/auth.types";

export const authService={
    Login : async (Credential: LoginDTO) : Promise<UserSessionDTO> =>{
        const response = await httpClient.post<UserSessionDTO>('/auth/login', Credential);
        return response.data;
    },

    logout : async () : Promise<void> =>{
        await httpClient.post('/auth/logout');
    }
    }