import { z } from "zod";
import {
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
} from "@/features/tickets/types/ticket.types";

export const createTicketSchema = z.object({
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  category: z.enum(TICKET_CATEGORIES, {
    message: "La categoría es obligatoria",
  }),
  priority: z.enum(TICKET_PRIORITIES).optional(),
  assetUuid: z.string().min(1, "El UUID del activo es obligatorio"),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
