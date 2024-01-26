import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import MediaRequestType from "~/types/media-request-type";
import { CreateMenfessValidatorType } from "~/validators/menfess/create-menfess-validator";

interface CreateMenfessApiResponse {
  message: string;
}

interface CreateMenfessApiBody extends CreateMenfessValidatorType {
  token: string;
  media?: MediaRequestType[];
}

export const createMenfessApiHandler = async ({
  token,
  ...body
}: CreateMenfessApiBody): Promise<CreateMenfessApiResponse> => {
  const { data } = await http.post("/menfess", body, {
    headers: { Authorization: `Bearer ${token}` },
  });

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
