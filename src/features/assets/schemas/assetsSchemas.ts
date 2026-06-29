import { z } from "zod";

export const assetSchema = z.object({
  code: z
    .string()
    .min(3, "El código debe tener al menos 3 caracteres")
    .max(40, "Máximo 40 caracteres"),
  name: z
    .string()
    .min(2, "El nombre es obligatorio")
    .max(120, "Máximo 120 caracteres"),
  serialNumber: z.string().max(60).optional().or(z.literal("")),
  description: z.string().max(280).optional().or(z.literal("")),
  assignedUserId: z.string().optional().or(z.literal(""))
});

export type AssetFormValues = z.infer<typeof assetSchema>;
