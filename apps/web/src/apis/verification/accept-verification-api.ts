import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface AcceptVerificationApiBody {
  token: string;
  id: string;
}

export const acceptVerificationApiHandler = async ({
  token,
  id,
}: AcceptVerificationApiBody) => {
  const { data } = await http.patch(`/verifications/approve/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAcceptVerification = (
  options?: UseMutationOptions<any, AxiosError<ErrorResponseType>, any>,
) => {
  return useMutation({
    mutationFn: acceptVerificationApiHandler,
    ...options,
  });
};
