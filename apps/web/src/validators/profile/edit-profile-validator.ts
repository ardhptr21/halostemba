import { z } from "zod";

export const EditProfileValidator = z.object({
  name: z.string().trim().min(1, { message: "Nama tidak boleh kosong." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email tidak boleh kosong." })
    .email({ message: "Email tidak valid." }),
  username: z
    .string()
    .trim()
    .min(1, { message: "Username tidak boleh kosong." }),
});

export type EditProfileValidatorType = z.infer<typeof EditProfileValidator>;
