import React from "react";
import { ApiError } from "../../lib/http/api-error";
import { HttpStatus } from "../../lib/http/http-status";

interface ApiErrorMessageProps{
    error: unknown;
}

export const ApiErrorMessage: React.FC<ApiErrorMessageProps> = ({error}) => {
    if (!(error instanceof ApiError)) return null;

    let title = "Unexpected error";
    let description = error.message || "Please try again later.";

    if(error.status === HttpStatus.FORBIDDEN) {
        title= "Access denied";
        description= "You do not have the necessary permissions to view this information."
    } else if (error.status === HttpStatus.NOT_FOUND){
        title="Resource not found";
        description= "The element required not exist or it was moved";
    } else if (error.status === HttpStatus.BAD_REQUEST){
        title = "Incorrect application"
    }
    return(
        <div className="p-4 mb-4 rounded-lg bg-red-50 border border-red-200 text-red-800 role = 'alert'">
            <h4 className="font-semibold text-sm">{title}</h4>
            <p className="text-xs mt-1 text-red-700">{description}</p>
        </div>
    );
};