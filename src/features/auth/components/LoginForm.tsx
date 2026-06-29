"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@shared/components/ui/Input";
import { Button } from "@shared/components/ui/Button";
import { loginSchema, type LoginFormValues } from "@features/auth/schemas/authSchemas";
import { useLogin } from "@features/auth/hooks/useLogin";
import { ApiRequestError } from "@shared/lib/http/errors";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  const login = useLogin();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await login.mutateAsync(values);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setServerError(err.message || "Credenciales inválidas");
      } else {
        setServerError("No fue posible iniciar sesión. Intenta más tarde.");
      }
    }
  });

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-4"
      aria-describedby={serverError ? "login-error" : undefined}
    >
      <Input
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        placeholder="usuario@empresa.com"
        required
        {...register("email")}
        error={errors.email?.message}
        leftAddon={<MailIcon />}
      />
      <Input
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        required
        {...register("password")}
        error={errors.password?.message}
        leftAddon={<LockIcon />}
      />

      {serverError && (
        <div
          id="login-error"
          role="alert"
          className="rounded-md border border-danger/50 bg-red-950/40 px-3 py-2 text-sm text-red-200"
        >
          {serverError}
        </div>
      )}

      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={login.isPending}
        disabled={login.isPending}
      >
        Iniciar sesión
      </Button>

      <p className="text-center text-xs text-fg-soft">
        Al continuar aceptas las políticas internas de uso del sistema.
      </p>
    </form>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 6h16v12H4z" />
      <path d="m4 6 8 7 8-7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </svg>
  );
}
