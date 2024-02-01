import { z } from "zod";

export const VerifyStudentValidator = z.object({
  nis: z
    .string()
    .length(10, { message: "NIS harus berisi 10 karakter." })
    .regex(/^[0-9]+$/, { message: "NIS harus berisi angka." })
    .trim(),
  majorId: z.string().uuid({ message: "Jurusan tidak valid." }),
  idCard: z.string().url({ message: "CardId tidak valid." }),
});

export type VerifyStudentValidatorType = z.infer<typeof VerifyStudentValidator>;
