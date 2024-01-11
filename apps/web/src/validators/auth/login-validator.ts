import { z } from "zod";

export const LoginValidator = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Username atau email tidak boleh kosong." }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password minimal 8 karakter." }),
});

export type LoginValidatorType = z.infer<typeof LoginValidator>;
