"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@features/auth/services/authService";
import { useAuthStore } from "@features/auth/store/authStore";
import { mapAuthUser } from "@features/auth/utils/mapAuthUser";
import { tokenMemoryStore } from "@features/auth/utils/tokenMemoryStore";
import { ROUTES } from "@/constants/routes";
import type { LoginFormValues } from "@features/auth/schemas/authSchemas";

export function useLogin() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const response = await authService.login(values);
      tokenMemoryStore.set(response.accessToken);
      setSession(mapAuthUser(response.usuario), response.accessToken);
      return response;
    },
    onSuccess: () => {
      router.replace(ROUTES.dashboard);
    }
  });
}
