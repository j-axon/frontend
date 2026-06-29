import { z } from "zod";

export const createTicketSchema = z.object({
  qrUuid: z.string().uuid("UUID inválido"),
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(120, "Máximo 120 caracteres"),
  description: z
    .string()
    .min(10, "Describe brevemente el problema (mín. 10 caracteres)")
    .max(1000, "Máximo 1000 caracteres"),
  category: z.enum(["HARDWARE", "SOFTWARE", "NETWORK", "PERIPHERAL", "OTHER"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"])
});

export type CreateTicketFormValues = z.infer<typeof createTicketSchema>;
