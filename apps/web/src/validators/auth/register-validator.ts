import { z } from "zod";

export const RegisterValidator = z
  .object({
    name: z.string().trim().min(1, { message: "Nama tidak boleh kosong." }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email tidak boleh kosong." })
      .email({ message: "Email tidak valid." }),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password minimal 8 karakter." }),
    confirmPassword: z
      .string()
      .trim()
      .min(8, { message: "Password minimal 8 karakter." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama.",
    path: ["confirmPassword"],
  });

export type RegisterValidatorType = z.infer<typeof RegisterValidator>;
