import { VerificationEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";

interface GetVerificationDataApiResponse extends VerificationEntity {}

export const getVerificationDataApiHandler = async (
  token: string,
): Promise<GetVerificationDataApiResponse | null> => {
  const { data } = await http.get("/verifications/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data[0];
};

export const useGetVerificationDataApi = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetVerificationDataApiResponse | null, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["verifications", "me"],
    queryFn: () => getVerificationDataApiHandler(token),
    ...options,
  });
};
