import React from "react";

export const LoadingState : React.FC = () => {
    return(
        <div className="flex flex-col items-center justify-center p-8 space-y-3" dara-testid="loading-state">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 font-medium">Cargando información...</p>
        </div>
    );
}