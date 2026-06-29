import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña es demasiado larga")
});

export type LoginFormValues = z.infer<typeof loginSchema>;
