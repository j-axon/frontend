"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketsService } from "@features/tickets/services/ticketsService";
import type {
  CreateTicketFormValues
} from "@features/tickets/schemas/ticketSchemas";
import type { TicketResponse } from "@features/tickets/types/tickets.types";

export function useCreateTicketFromQr() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: CreateTicketFormValues): Promise<TicketResponse> => {
      return ticketsService.create({
        qrUuid: values.qrUuid,
        title: values.title,
        description: values.description,
        category: values.category,
        priority: values.priority
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tickets", "mine"] });
    }
  });
}
