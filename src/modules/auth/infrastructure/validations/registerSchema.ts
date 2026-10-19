import { z } from "zod";

const RoleEnum = z.enum(["editor", "creator"]);

export const registerSchema = z.object({
  name: z
    .string({ error: "Nama wajib diisi" }) // Menggunakan properti error yang baru
    .min(3, "Nama minimal harus terdiri dari 3 karakter")
    .max(50, "Nama maksimal 50 karakter"),

  email: z
    .string({ error: "Email wajib diisi" })
    .email("Format email tidak valid (contoh: user@mail.com)"),

  password: z
    .string({ error: "Password wajib diisi" })
    .min(8, "Password minimal harus 8 karakter")
    .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf kapital")
    .regex(/[0-9]/, "Password harus mengandung minimal 1 angka"),

  role: RoleEnum.default("creator"),
});

export type TRegisterPayload = z.infer<typeof registerSchema>;