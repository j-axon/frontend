import React from "react";
import { ApiError } from "../../lib/http/api-error";
import { HttpStatus } from "../../lib/http/http-status";

interface ApiErrorMessageProps{
    error: unknown;
}

export const ApiErrorMessage: React.FC<ApiErrorMessageProps> = ({error}) => {
    if (!(error instanceof ApiError)) return null;

    let title = "Error inesperado";
    let description = error.message || "Por favor, intente nuevamente más tarde.";

    if(error.status === HttpStatus.FORBIDDEN) {
        title= "Acceso denegado";
        description= "No tienes los permisos necesarios para ver esta información."
    } else if (error.status === HttpStatus.NOT_FOUND){
        title="Recurso no encontrado";
        description= "El elemento solicitado no existe o fue movido";
    } else if (error.status === HttpStatus.BAD_REQUEST){
        title = "Solicitud incorrecta"
    }
    return(
        <div className="p-4 mb-4 rounded-lg bg-red-50 border border-red-200 text-red-800 role = 'alert'">
            <h4 className="font-semibold text-sm">{title}</h4>
            <p className="text-xs mt-1 text-red-700">{description}</p>
        </div>
    );
};