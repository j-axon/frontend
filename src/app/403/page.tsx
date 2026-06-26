"use client";
import Link from "next/link";

export default function UnauthorrizedPage(){
    return ( 
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6 text-center">
            <div className="max-w-md space-y-4">
                <h1 className="text-6xl font-black tracking-tighter text-gray-900">403</h1>
                <h2 className="text-xl font-bold text-gray-800">Acceso Denegado</h2>
                <p className="text-sm text-gray-500">
                    Su nivel de autorización no permite el acceso a esta sección.
                </p>
                <div className="pt-4">
                    <Link href={"/dashboard"}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >Volver al Panel
                    </Link>
                </div>
            </div>

        </main>
    )
}