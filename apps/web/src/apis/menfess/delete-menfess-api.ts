import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface DeleteMenfessApiResponse {
  message: string;
}

interface DeleteMenfessApiBody {
  id: string;
  token: string;
}

export const deleteMenfessApiHandler = async ({
  id,
  token,
}: DeleteMenfessApiBody): Promise<DeleteMenfessApiResponse> => {
  const { data } = await http.delete("/menfess/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const useDeleteMenfessApi = (
  options?: UseMutationOptions<
    DeleteMenfessApiResponse,
    AxiosError<ErrorResponseType>,
    DeleteMenfessApiBody
  >,
) => {
  return useMutation({
    mutationFn: deleteMenfessApiHandler,
    ...options,
  });
};
