import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import { EmailVerificationValidatorType } from "~/validators/auth/email-verification-validator";

interface EmailVerificationApiResponse {
  message: string;
}

export const emailVerificationApiHandler = async (
  body: EmailVerificationValidatorType,
): Promise<EmailVerificationApiResponse> => {
  const { data } = await http.post("/auth/request-verify-email", body);
  return data;
};

export const useEmailVerification = (
  options?: UseMutationOptions<
    EmailVerificationApiResponse,
    AxiosError<ErrorResponseType>,
    EmailVerificationValidatorType
  >,
) => {
  return useMutation({
    mutationFn: emailVerificationApiHandler,
    ...options,
  });
};
