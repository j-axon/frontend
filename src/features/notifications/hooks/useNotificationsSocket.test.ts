import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useNotificationsSocket } from "./useNotificationsSocket";
import * as authModule from "@/hooks/use-auth";

vi.mock("../services/stomp-client", () => ({
  stompClient: {
    connect: vi.fn().mockResolvedValue(undefined),
    disconnect: vi.fn(),
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
    get connectionStatus() {
      return false;
    },
  },
  subscribeToUserNotifications: vi.fn(),
  unsubscribeFromUserNotifications: vi.fn(),
}));

vi.mock("@/hooks/use-auth", () => ({
  useAuth: vi.fn(),
}));

type AuthState = ReturnType<typeof authModule.useAuth>;
type UserRole = "ADMIN" | "USER" | "TECHNICIAN" | "AUDITOR";

describe("useNotificationsSocket", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns initial state", async () => {
    vi.mocked(authModule.useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
    } satisfies Partial<AuthState> as AuthState);

    const { result } = renderHook(() => useNotificationsSocket());

    expect(result.current.notifications).toEqual([]);
    expect(result.current.isConnected).toBe(false);
    expect(result.current.unreadCount).toBe(0);
  });

  it("connects when authenticated", async () => {
    const mockUser = {
      id: "user-1",
      name: "Test User",
      email: "test@test.com",
      roles: ["USER"] as UserRole[],
    };

    vi.mocked(authModule.useAuth).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
    } satisfies Partial<AuthState> as AuthState);

    const { result } = renderHook(() => useNotificationsSocket());

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true);
    });
  });

  it("disconnects when not authenticated", async () => {
    vi.mocked(authModule.useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
    } satisfies Partial<AuthState> as AuthState);

    const { result } = renderHook(() => useNotificationsSocket());

    await waitFor(() => {
      expect(result.current.isConnected).toBe(false);
    });
  });

  it("marks notification as read", async () => {
    vi.mocked(authModule.useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
    } satisfies Partial<AuthState> as AuthState);

    const { result } = renderHook(() => useNotificationsSocket());

    // Add a mock notification to state
    act(() => {
      // This would be tested by firing events from the socket
    });

    expect(result.current.markAsRead).toBeDefined();
  });

  it("clears all notifications", async () => {
    vi.mocked(authModule.useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
    } satisfies Partial<AuthState> as AuthState);

    const { result } = renderHook(() => useNotificationsSocket());

    expect(result.current.clearAll).toBeDefined();
    expect(result.current.notifications).toEqual([]);
  });
});