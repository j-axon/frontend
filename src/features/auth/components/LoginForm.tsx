// src/features/auth/components/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export const LoginForm: React.FC = () => {
  const { loginUser, isLoading } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      await loginUser(data);
      router.push(ROUTES.dashboard);
    } catch (error: any) {
      setServerError("Credenciales inválidas o error de conexión con el servidor.");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          J-AXON
        </h2>
        <p className="text-xs text-gray-500 mt-2">
          Help Desk, inventario inteligente y diagnósticos.
        </p>
      </div>
      
      {serverError && (
        <div className="p-3 mb-5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20 transition-all"
            placeholder="email@jaxon.com"
          />
          {errors.email && (
            <span className="text-xs text-red-500 mt-1.5 block">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20 transition-all"
            placeholder="******"
          />
          {errors.password && (
            <span className="text-xs text-red-500 mt-1.5 block">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-2.5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium text-sm rounded-lg transition-all active:scale-[0.99] disabled:opacity-50 shadow-sm"
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
};