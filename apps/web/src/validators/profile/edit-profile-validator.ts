import { z } from "zod";

export const EditProfileValidator = z.object({
  name: z.string().trim().min(1, { message: "Nama tidak boleh kosong." }),

  username: z
    .string()
    .trim()
    .min(1, { message: "Username tidak boleh kosong." }),
  bio: z.string().trim().nullable(),
  avatar: z.string().trim().nullable(),
});

export type EditProfileValidatorType = z.infer<typeof EditProfileValidator>;

export const EditEmailValidator = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email tidak boleh kosong." })
    .email({ message: "Email tidak valid." }),
});

export type EditEmailValidatorType = z.infer<typeof EditEmailValidator>;
