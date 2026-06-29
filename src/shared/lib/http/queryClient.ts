import { QueryClient } from "@tanstack/react-query";
import { ApiRequestError } from "./errors";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: (failureCount, error) => {
        if (error instanceof ApiRequestError) {
          if (error.status >= 400 && error.status < 500) return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: false
    }
  }
});
