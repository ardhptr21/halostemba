import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import http from "~/lib/axios";

export interface VerifyForgotPasswordOTPApiHandlerResponse {
  message: string;
  token: string;
}

interface VerifyForgotPasswordOTPBody {
  otp: string;
  email: string;
}

export const verifyForgotPasswordOTPApiHandler = async (
  body: VerifyForgotPasswordOTPBody,
): Promise<VerifyForgotPasswordOTPApiHandlerResponse> => {
  const { data } = await http.post("/auth/forgot-password/verify", body);
  return data;
};

export const useVerifyForgotPasswordOTP = (
  options?: UseMutationOptions<
    VerifyForgotPasswordOTPApiHandlerResponse,
    any,
    VerifyForgotPasswordOTPBody
  >,
) => {
  return useMutation({
    mutationFn: verifyForgotPasswordOTPApiHandler,
    ...options,
  });
};
