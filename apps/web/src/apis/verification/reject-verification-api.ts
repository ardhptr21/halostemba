import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import { RejectVerificationValidatorType } from "~/validators/verification/reject-verification-validator";

interface RejectVerificationApiBody extends RejectVerificationValidatorType {
  token: string;
  id: string;
}

export const rejectVerificationApiHandler = async ({
  token,
  id,
  note,
}: RejectVerificationApiBody) => {
  const { data } = await http.patch(
    `/verifications/reject/${id}`,
    { note },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const useRejectVerification = (
  options?: UseMutationOptions<
    any,
    AxiosError<ErrorResponseType>,
    RejectVerificationValidatorType
  >,
) => {
  return useMutation({
    mutationFn: rejectVerificationApiHandler,
    ...options,
  });
};
