import { AdminVerificationEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import WithMetaResponseType from "~/types/with-meta-response-type";

interface GetListVerificationResponse
  extends WithMetaResponseType<AdminVerificationEntity[]> {}

interface GetListVerificationParams {
  page?: number;
  perPage?: number;
}

export const getListVerificationApiHandler = async (
  token: string,
  params?: GetListVerificationParams,
): Promise<GetListVerificationResponse> => {
  const { data } = await http.get("/verifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return data;
};

export const useGetListVerifications = (
  token: string,
  params?: GetListVerificationParams,
  options?: Partial<
    UseQueryOptions<GetListVerificationResponse, AxiosError<ErrorResponseType>>
  >,
) => {
  return useQuery({
    queryKey: ["verification", "list", params],
    queryFn: () => getListVerificationApiHandler(token, params),
    ...options,
  });
};
