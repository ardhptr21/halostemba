import { UserEntity } from "@halostemba/entities";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import LoginApiDto from "~/dtos/auth/login-api.dto";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import { LoginValidatorType } from "~/validators/auth/login-validator";

export interface LoginApiHandlerResponse {
  user: UserEntity;
  access_token: string;
}

export const loginApiHandler = async (
  body: LoginValidatorType,
): Promise<LoginApiHandlerResponse> => {
  const { data } = await http.post("/auth/login", body);
  return data;
};

export const useLogin = (
  body: LoginApiDto,
  options?: UseMutationOptions<
    LoginApiHandlerResponse,
    AxiosError<ErrorResponseType>
  >,
) => {
  return useMutation({
    mutationFn: () => loginApiHandler(body),
    ...options,
  });
};
