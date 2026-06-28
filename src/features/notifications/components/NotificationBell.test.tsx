import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NotificationBell } from "./NotificationBell";
import type { AppNotification } from "../types/notification.types";

const mockNotification: AppNotification = {
  id: "1",
  type: "TICKET_UPDATED",
  title: "Ticket Actualizado",
  message: "El ticket #123 ha sido actualizado",
  priority: "medium",
  ticketId: "123",
  read: false,
  timestamp: new Date().toISOString(),
};

const mockNotifications: AppNotification[] = [
  mockNotification,
  {
    id: "2",
    type: "TICKET_CREATED",
    title: "Nuevo Ticket",
    message: "Se ha creado el ticket #456",
    priority: "low",
    read: true,
    timestamp: new Date().toISOString(),
  },
];

describe("NotificationBell", () => {
  const defaultProps = {
    notifications: mockNotifications,
    unreadCount: 1,
    onMarkAsRead: vi.fn(),
    onMarkAllAsRead: vi.fn(),
    onRemove: vi.fn(),
    onClearAll: vi.fn(),
  };

  it("renders notification bell icon", () => {
    render(<NotificationBell {...defaultProps} />);
    expect(screen.getByLabelText("Notificaciones")).toBeInTheDocument();
  });

  it("shows unread count badge", () => {
    render(<NotificationBell {...defaultProps} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("opens dropdown on click", () => {
    render(<NotificationBell {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Notificaciones"));
    expect(screen.getByText("Notificaciones")).toBeInTheDocument();
  });

  it("displays notifications when open", () => {
    render(<NotificationBell {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Notificaciones"));
    expect(screen.getByText("Ticket Actualizado")).toBeInTheDocument();
  });

  it("shows empty state when no notifications", () => {
    render(<NotificationBell {...defaultProps} notifications={[]} unreadCount={0} />);
    fireEvent.click(screen.getByLabelText("Notificaciones"));
    expect(screen.getByText("No hay notificaciones")).toBeInTheDocument();
  });

  it("calls onMarkAsRead when clicking unread notification", () => {
    const onMarkAsRead = vi.fn();
    render(<NotificationBell {...defaultProps} onMarkAsRead={onMarkAsRead} />);
    fireEvent.click(screen.getByLabelText("Notificaciones"));
    fireEvent.click(screen.getByText("Ticket Actualizado"));
    expect(onMarkAsRead).toHaveBeenCalledWith("1");
  });
});