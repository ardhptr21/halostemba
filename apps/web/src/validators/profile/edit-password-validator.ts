import { z } from "zod";

export const EditPasswordValidator = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(8, { message: "Password minimal 8 karakter." }),
    confirmPassword: z
      .string()
      .trim()
      .min(8, { message: "Password minimal 8 karakter." }),
  })

  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak sama.",
    path: ["confirmPassword"],
  });

export type EditPasswordValidatorType = z.infer<typeof EditPasswordValidator>;
