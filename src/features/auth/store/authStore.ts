"use client";

import { create } from "zustand";
import type { AuthUser } from "@/types/auth";
import { tokenMemoryStore } from "../utils/tokenMemoryStore";

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  /**
   * `null` → SSR no emitió juicio (público o página renderizada fuera del
   * matcher del middleware).
   * `true` / `false` → el middleware confirmó presencia/ausencia de la cookie
   * `jaxon_refresh_token` antes del render server-side.
   *
   * `useCurrentUser` usa este valor para saltarse la llamada `/auth/me`
   * cuando ya sabemos que no hay sesión, evitando 401 espurios y flash de UI.
   */
  ssrHasSession: boolean | null;
  bootstrap: () => Promise<void>;
  setSession: (user: AuthUser, accessToken: string) => void;
  clearSession: () => void;
  setSsrHasSession: (value: boolean | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  ssrHasSession: null,

  async bootstrap() {
    // Implementación real en useCurrentUser — el store solo guarda en memoria.
  },

  setSession(user, accessToken) {
    tokenMemoryStore.set(accessToken);
    set({ user, isAuthenticated: true });
  },

  clearSession() {
    tokenMemoryStore.clear();
    set({ user: null, isAuthenticated: false });
  },

  setSsrHasSession(value) {
    set({ ssrHasSession: value });
  }
}));
