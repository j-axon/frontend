import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { error } from "node:console";

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) { 
        throw new Error ('useAuth must be using over the Auth');
    }
    return context;
}