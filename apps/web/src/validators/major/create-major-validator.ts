import { z } from "zod";

export const CreateMajorValidator = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Nama jurusan tidak boleh kosong." }),
});

export type CreateMajorValidatorType = z.infer<typeof CreateMajorValidator>;
