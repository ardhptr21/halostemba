import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface DeleteCommentApiResponse {
  message: string;
}

interface DeleteMenfessApiBody {
  id: string;
  token: string;
}

export const deleteCommentApiHandler = async ({
  id,
  token,
}: DeleteMenfessApiBody): Promise<DeleteCommentApiResponse> => {
  const { data } = await http.delete("/comments/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const useDeleteCommentApi = (
  options?: UseMutationOptions<
    DeleteCommentApiResponse,
    AxiosError<ErrorResponseType>,
    DeleteMenfessApiBody
  >,
) => {
  return useMutation({
    mutationFn: deleteCommentApiHandler,
    ...options,
  });
};
