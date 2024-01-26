import { z } from "zod";

export const CreateTicketValidator = z.object({
  title: z
    .string()
    .min(5, { message: "Judul tidak boleh kurang dari 5 huruf." })
    .trim(),
  detail: z
    .string()
    .min(20, { message: "Detail tidak boleh kurang dari 20 huruf." })
    .trim(),
});

export type CreateTicketValidatorType = z.infer<typeof CreateTicketValidator>;
