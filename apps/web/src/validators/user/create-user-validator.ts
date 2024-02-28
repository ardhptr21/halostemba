import { z } from "zod";

export const CreateUserValidator = z.object({
  name: z.string().trim().min(1, { message: "Nama tidak boleh kosong." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email tidak boleh kosong." })
    .email({ message: "Email tidak valid." }),
  role: z.enum(["ADMIN", "TEACHER"]),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password minimal 8 karakter." }),
});

export type CreateUserValidatorType = z.infer<typeof CreateUserValidator>;
