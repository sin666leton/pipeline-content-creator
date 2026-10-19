import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ error: "Email wajib diisi" })
    .email("Format email tidak valid"),

  password: z
    .string({ error: "Password wajib diisi" })
});

export type TLoginPayload = z.infer<typeof LoginSchema>;