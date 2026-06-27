import { z } from "zod";
import { TICKET_CATEGORIES, TICKET_PRIORITIES } from "@/features/tickets/types/ticket.types";

export const createTicketSchema = z.object({
  descripcion: z
    .string()
    .trim()
    .min(10, "La descripcion debe tener al menos 10 caracteres"),
  categoria: z.enum(TICKET_CATEGORIES, {
    error: "La categoria es obligatoria"
  }),
  prioridad: z.enum(TICKET_PRIORITIES)
});

export type CreateTicketFormValues = z.infer<typeof createTicketSchema>;
