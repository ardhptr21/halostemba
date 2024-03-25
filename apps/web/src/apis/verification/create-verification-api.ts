import { VerificationEntity } from "@halostemba/entities";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface CreateVerificationResponce extends VerificationEntity {}

interface CreateVerificationBody {
  majorId: string;
  nis: string;
  idCard: string;
  token: string;
}

export const createVerificationApiHandler = async (
  body: CreateVerificationBody,
): Promise<CreateVerificationResponce> => {
  const { data } = await http.post("/verifications", body, {
    headers: { Authorization: `Bearer ${body.token}` },
  });

  return data;
};

export const useCreateVerification = (
  options?: UseMutationOptions<
    CreateVerificationResponce,
    AxiosError<ErrorResponseType>,
    CreateVerificationBody
  >,
) => {
  return useMutation({
    mutationFn: createVerificationApiHandler,
    ...options,
  });
};
