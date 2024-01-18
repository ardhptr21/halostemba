import { z } from "zod";

export const CreateMenfessValidator = z.object({
  content: z.string().min(1, { message: "Menfess tidak boleh kosong." }),
  anonymous: z.boolean().default(true),
});

export type CreateMenfessValidatorType = z.infer<typeof CreateMenfessValidator>;
