import { UserEntity } from "@halostemba/entities";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import { CreateUserValidatorType } from "~/validators/user/create-user-validator";

interface CreateUserApiResponse extends UserEntity {}

interface CreateUserApiBody extends CreateUserValidatorType {
  token: string;
}

const createUserApiHandler = async ({
  token,
  ...body
}: CreateUserApiBody): Promise<CreateUserApiResponse> => {
  const { data } = await http.post("/users", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateUser = (
  options?: UseMutationOptions<
    CreateUserApiResponse,
    AxiosError<ErrorResponseType>,
    CreateUserValidatorType
  >,
) => {
  return useMutation({
    mutationFn: createUserApiHandler,
    ...options,
  });
};
