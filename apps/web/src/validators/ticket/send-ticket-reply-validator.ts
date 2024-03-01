import { z } from "zod";

export const SendTicketReplyValidator = z.object({
  message: z.string().min(1, { message: "Pesan tidak boleh kosong." }).trim(),
});

export type SendTicketReplyValidatorType = z.infer<
  typeof SendTicketReplyValidator
>;
