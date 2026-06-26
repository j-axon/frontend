
import  {HttpStatusCode} from "../http/http-status";

export class ApiError extends Error{
    public status : HttpStatusCode;
    public message: string;
    public details?: unknown;

    constructor(status: HttpStatusCode , message : string, details?: unknown){
        super(message)
        this.name= "ApiError";
        this.status = status;
        this.message = message;
        this.details = details;
        Object.setPrototypeOf(this, ApiError.prototype)
    }
    
}