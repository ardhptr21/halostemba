import { z } from "zod";

export const RejectVerificationValidator = z.object({
  note: z.string().min(20, "Note tidak boleh kurang dari 20 karakter."),
});

export type RejectVerificationValidatorType = z.infer<
  typeof RejectVerificationValidator
>;
