import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import { ForgotPasswordValidatorType } from "~/validators/auth/forgot-password-validator";

export interface ForgotPasswordApiHandlerResponse {
  message: string;
}

export const forgotPasswordApiHandler = async (
  body: ForgotPasswordValidatorType,
): Promise<ForgotPasswordApiHandlerResponse> => {
  const { data } = await http.post("/auth/forgot-password", body);
  return data;
};

export const useForgotPassword = (
  options?: UseMutationOptions<
    ForgotPasswordApiHandlerResponse,
    ErrorResponseType,
    ForgotPasswordValidatorType
  >,
) => {
  return useMutation({
    mutationFn: forgotPasswordApiHandler,
    ...options,
  });
};
