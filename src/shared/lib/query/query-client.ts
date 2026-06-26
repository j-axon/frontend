import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "../http/api-error";
import { HttpStatus, HttpStatusCode } from "../http/http-status";
import { error } from "node:console";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, 
            retry: (failureCount, error) => {
                if(failureCount >= 3) return false;

                if(error instanceof ApiError){
                    const nonRetryableStatus: HttpStatusCode[] =[
                        HttpStatus.BAD_REQUEST,
                        HttpStatus.UNAUTHORIZED,
                        HttpStatus.FORBIDDEN,
                        HttpStatus.NOT_FOUND
                    ];
                    return !nonRetryableStatus.includes(error.status);
                }
                return true
            },
        },
    },
});