import React from "react";

interface EmptyStateProps{
    title?: string;
    message? : string;
}

export const EmptyState : React.FC<EmptyStateProps> = ({
    title = "there isn't results" ,
    message= "No records were found in this module"
}) =>{
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <h3 className="text-base font-semibold text-gray-800"> {title}</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">{message}</p>
        </div>
    );
};