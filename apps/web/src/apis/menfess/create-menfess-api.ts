import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import { CreateMenfessValidatorType } from "~/validators/menfess/create-menfess-validator";

interface CreateMenfessApiResponse {
  message: string;
}

interface CreateMenfessApiBody extends CreateMenfessValidatorType {
  token: string;
}

export const createMenfessApiHandler = async (
  body: CreateMenfessApiBody,
): Promise<CreateMenfessApiResponse> => {
  const { data } = await http.post(
    "/menfess",
    { content: body.content, anonymous: body.anonymous },
    { headers: { Authorization: `Bearer ${body.token}` } },
  );

  return data;
};

export const useCreateMenfess = (
  options?: UseMutationOptions<
    CreateMenfessApiResponse,
    AxiosError<ErrorResponseType>,
    CreateMenfessApiBody
  >,
) => {
  return useMutation({
    mutationFn: createMenfessApiHandler,
    ...options,
  });
};
