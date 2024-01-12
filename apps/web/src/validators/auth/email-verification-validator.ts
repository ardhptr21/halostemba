import { z } from "zod";
import { ForgotPasswordValidator } from "./forgot-password-validator";

export const EmailVerificationValidator = ForgotPasswordValidator;

export type EmailVerificationValidatorType = z.infer<
  typeof EmailVerificationValidator
>;
