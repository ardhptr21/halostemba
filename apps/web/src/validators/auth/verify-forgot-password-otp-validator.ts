import { z } from "zod";

export const VerifyOTPValidator = z.object({
  otp1: z.coerce.number().min(0).max(9),
  otp2: z.coerce.number().min(0).max(9),
  otp3: z.coerce.number().min(0).max(9),
  otp4: z.coerce.number().min(0).max(9),
  otp5: z.coerce.number().min(0).max(9),
  otp6: z.coerce.number().min(0).max(9),
});

export type VerifyOTPValidatorType = z.infer<typeof VerifyOTPValidator>;
