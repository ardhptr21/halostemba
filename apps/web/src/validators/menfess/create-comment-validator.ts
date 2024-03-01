import { z } from "zod";

export const CreateCommentValidator = z.object({
  content: z.string().min(1, { message: "Komentar tidak boleh kosong." }),
});

export type CreateCommentValidatorType = z.infer<typeof CreateCommentValidator>;
