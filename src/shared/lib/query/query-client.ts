import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export function invalidateTicketsCache(): void {
  queryClient.invalidateQueries({ queryKey: ["tickets"] });
}

export function invalidateTicketCache(ticketId: string): void {
  queryClient.invalidateQueries({ queryKey: ["tickets", ticketId] });
}

export function updateTicketCache(ticketId: string, data: unknown): void {
  queryClient.setQueryData(["tickets", ticketId], data);
}