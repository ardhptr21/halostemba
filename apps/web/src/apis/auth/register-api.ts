import { UserEntity } from "@halostemba/entities";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import { RegisterValidatorType } from "~/validators/auth/register-validator";

export interface RegisterApiHandlerResponse extends UserEntity {}

export const registerApiHandler = async (
  body: RegisterValidatorType,
): Promise<RegisterApiHandlerResponse> => {
  const { data } = await http.post("/auth/register", body);
  return data;
};

export const useRegister = (
  options?: UseMutationOptions<
    RegisterApiHandlerResponse,
    ErrorResponseType,
    RegisterValidatorType
  >,
) => {
  return useMutation({
    mutationFn: registerApiHandler,
    ...options,
  });
};
