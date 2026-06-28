export interface LoginDTO{
    email : string;
    password : string;
}
export interface UserSessionDTO{
    uuid : string;
    email : string;
    name : string;
    role : 'ADMIN' | 'TECNICO' | 'AUDITOR' | 'USUARIO';
    accessToken : string;

    user:{
        id:string;
        email: string;
        role: string;
    }
}