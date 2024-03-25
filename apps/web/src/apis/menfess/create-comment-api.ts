import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import { CreateCommentValidatorType } from "~/validators/menfess/create-comment-validator";

interface CreateCommentApiResponse {
  message: string;
}

interface CreateCommentApiBody extends CreateCommentValidatorType {
  token: string;
  menfessId: string;
}

export const createCommentApiHandler = async (
  body: CreateCommentApiBody,
): Promise<CreateCommentApiResponse> => {
  const { data } = await http.post(
    `/comments/${body.menfessId}`,
    { content: body.content },
    { headers: { Authorization: `Bearer ${body.token}` } },
  );

  return data;
};

export const useCreateComment = (
  options?: UseMutationOptions<
    CreateCommentApiResponse,
    AxiosError<ErrorResponseType>,
    CreateCommentApiBody
  >,
) => {
  return useMutation({
    mutationFn: createCommentApiHandler,
    ...options,
  });
};
