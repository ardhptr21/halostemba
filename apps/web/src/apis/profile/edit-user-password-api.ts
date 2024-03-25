import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface EditUserProfileApiResponse {
  message: string;
}

interface EditPasswordApiBody {
  token: string;
  password: string;
}

export const editUserPasswordApiHandler = async (
  body: EditPasswordApiBody,
): Promise<EditUserProfileApiResponse> => {
  const { data } = await http.patch("/profile/change-password", body, {
    headers: {
      Authorization: `Bearer ${body.token}`,
    },
  });
  return data;
};

export const useEditUserPassword = (
  options?: UseMutationOptions<
    EditUserProfileApiResponse,
    AxiosError<ErrorResponseType>,
    EditPasswordApiBody
  >,
) => {
  return useMutation({
    mutationFn: editUserPasswordApiHandler,
    ...options,
  });
};
