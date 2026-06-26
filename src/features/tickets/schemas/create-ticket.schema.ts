import { z } from "zod";

export const createTicketSchema = z.object({
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  category: z.enum(["Mantenimiento", "Soporte Técnico", "Infraestructura", "Otros"], {
    message: "La categoría es obligatoria",
  }),
  priority: z.enum(["Baja", "Media", "Alta"]).optional(),
  assetUuid: z.string().min(1, "El UUID del activo es obligatorio"),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
