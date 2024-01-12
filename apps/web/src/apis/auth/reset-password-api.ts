import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface ResetPasswordApiHandlerResponse {
  message: string;
}

interface ResetPasswordApiHandlerBody {
  token: string;
  password: string;
}

export const resetPasswordApiHandler = async (
  body: ResetPasswordApiHandlerBody,
): Promise<ResetPasswordApiHandlerResponse> => {
  const { data } = await http.post("/auth/forgot-password/reset", body);
  return data;
};

export const useResetPassword = (
  options?: UseMutationOptions<
    ResetPasswordApiHandlerResponse,
    ErrorResponseType,
    ResetPasswordApiHandlerBody
  >,
) => {
  return useMutation({
    mutationFn: resetPasswordApiHandler,
    ...options,
  });
};
