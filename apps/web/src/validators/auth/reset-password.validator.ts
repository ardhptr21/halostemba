import { z } from "zod";

export const ResetPasswordValidator = z
  .object({
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

export type ResetPasswordValidatorType = z.infer<typeof ResetPasswordValidator>;
