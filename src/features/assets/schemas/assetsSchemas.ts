import { z } from "zod";

/**
 * Schema alineado con `CreateActivoRequest` del backend
 * (backend/src/main/java/.../application/activo/dto/CreateActivoRequest.java).
 * NO enviar campos que el backend no conoce (description, assignedUserId) — el
 * backend los rechaza con "La solicitud contiene campos inválidos".
 */
export const assetSchema = z.object({
  codigoInventario: z
    .string()
    .min(1, "El código es obligatorio")
    .max(80, "Máximo 80 caracteres"),
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(160, "Máximo 160 caracteres"),
  tipo: z.string().max(80).optional().or(z.literal("")),
  marca: z.string().max(80).optional().or(z.literal("")),
  modelo: z.string().max(120).optional().or(z.literal("")),
  serial: z.string().max(120).optional().or(z.literal("")),
  ubicacion: z.string().max(160).optional().or(z.literal(""))
});

export type AssetFormValues = z.infer<typeof assetSchema>;
