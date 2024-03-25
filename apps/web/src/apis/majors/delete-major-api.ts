import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface DeleteMajorApiResponse {
  message: string;
}

interface DeleteMajorApiBody {
  id: string;
  token: string;
}

export const deleteMajorApiHandler = async ({
  id,
  token,
}: DeleteMajorApiBody): Promise<DeleteMajorApiResponse> => {
  const { data } = await http.delete(`/majors/${id} `, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const useDeleteMajor = (
  options?: UseMutationOptions<
    DeleteMajorApiResponse,
    AxiosError<ErrorResponseType>,
    DeleteMajorApiBody
  >,
) => {
  return useMutation({
    mutationFn: deleteMajorApiHandler,
    ...options,
  });
};
