"use client";
import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
            <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm text-center">
                <h1 className="text-6xl font-bold tracking-tight text-gray-900">403</h1>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Acceso Denegado</h2>
                <p className="mt-2 text-xs text-gray-500">
                    Su nivel de autorización no permite el acceso a esta sección.
                </p>
                <div className="mt-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.99]"
                    >
                        Volver al Panel
                    </Link>
                </div>
            </div>
        </main>
    );
}