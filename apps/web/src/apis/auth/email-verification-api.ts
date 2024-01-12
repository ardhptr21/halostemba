import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import { EmailVerificationValidatorType } from "~/validators/auth/email-verification-validator";

interface EmailVerificationApiHandlerResponse {
  message: string;
}

interface EmailVerificationApiHandlerBody
  extends EmailVerificationValidatorType {
  token: string;
}

export const emailVerificationApiHandler = async ({
  token,
  ...body
}: EmailVerificationApiHandlerBody): Promise<EmailVerificationApiHandlerResponse> => {
  const { data } = await http.post("/auth/request-verify-email", body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const useEmailVerification = (
  options?: UseMutationOptions<
    EmailVerificationApiHandlerResponse,
    ErrorResponseType,
    EmailVerificationApiHandlerBody
  >,
) => {
  return useMutation({
    mutationFn: emailVerificationApiHandler,
    ...options,
  });
};
