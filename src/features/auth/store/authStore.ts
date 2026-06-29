"use client";

import { create } from "zustand";
import type { AuthUser } from "@/types/auth";
import { tokenMemoryStore } from "../utils/tokenMemoryStore";

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  bootstrap: () => Promise<void>;
  setSession: (user: AuthUser, accessToken: string) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

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
  }
}));
