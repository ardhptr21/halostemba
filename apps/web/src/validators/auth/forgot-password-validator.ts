import { z } from "zod";

export const ForgotPasswordValidator = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email tidak boleh kosong." })
    .email({ message: "Email tidak valid." }),
});

export type ForgotPasswordValidatorType = z.infer<
  typeof ForgotPasswordValidator
>;
