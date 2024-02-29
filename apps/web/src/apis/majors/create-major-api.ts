import { MajorEntity } from "@halostemba/entities";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import { CreateMajorValidatorType } from "~/validators/major/create-major-validator";

interface CreateMajorApiResponse extends MajorEntity {}

interface CreateMajorApiBody extends CreateMajorValidatorType {
  token: string;
}

const createMajorApiHandler = async ({
  token,
  ...body
}: CreateMajorApiBody): Promise<CreateMajorApiResponse> => {
  const { data } = await http.post("/majors", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateMajor = (
  options?: UseMutationOptions<
    CreateMajorApiResponse,
    AxiosError<ErrorResponseType>,
    CreateMajorValidatorType
  >,
) => {
  return useMutation({
    mutationFn: createMajorApiHandler,
    ...options,
  });
};
