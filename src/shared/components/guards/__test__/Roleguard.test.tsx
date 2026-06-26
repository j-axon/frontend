import React from "react";
import { render, screen } from "@testing-library/react";
import { RoleGuard } from "../Roleguard";

const mockUseAuth = vi.hoisted(() => vi.fn());
const mockUseRouter = vi.hoisted(() => vi.fn());
const mockUsePathname = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/hooks/useAuth", () => ({
  useAuth: mockUseAuth
}));

vi.mock("next/navigation", () => ({
  useRouter: mockUseRouter,
  usePathname: mockUsePathname
}));

describe("RoleGuard RBAC Security Component", () => {
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue({ replace: mockReplace });
  });

  test("should redirect to /login if no authenticated user is found", () => {
    mockUseAuth.mockReturnValue({ user: null, isLoading: false });
    mockUsePathname.mockReturnValue("/dashboard");

    render(<RoleGuard><div>Secure Content</div></RoleGuard>);
    expect(mockReplace).toHaveBeenCalledWith("/login");
  });

  test("should redirect to /403 if user lacks permission for the path", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "user@jaxon.com", role: "USER" },
      isLoading: false,
    });
    mockUsePathname.mockReturnValue("/users");

    render(<RoleGuard><div>Secure Content</div></RoleGuard>);
    expect(mockReplace).toHaveBeenCalledWith("/403");
  });

  test("should render children safely if user has valid permissions", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "admin@jaxon.com", role: "ADMIN" },
      isLoading: false,
    });
    mockUsePathname.mockReturnValue("/users");

    render(<RoleGuard><div data-testid="protected">Welcome Admin</div></RoleGuard>);
    expect(screen.getByTestId("protected")).toBeDefined();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});