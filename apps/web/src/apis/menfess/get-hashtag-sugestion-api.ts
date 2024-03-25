import { HashtagEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface GetHashtagSugestionApiResponse extends HashtagEntity {}

interface GetHashtagSugestionApiParams {
  q: string;
}

export const getHashtagSugestionApiHandler = async (
  params: GetHashtagSugestionApiParams,
): Promise<GetHashtagSugestionApiResponse[]> => {
  const { data } = await http.get("/hashtags/search", {
    params,
  });

  return data.data;
};

export const useGetHashtagSugestionApi = (
  params: GetHashtagSugestionApiParams,
  options?: Partial<
    UseQueryOptions<
      GetHashtagSugestionApiResponse[],
      AxiosError<ErrorResponseType>
    >
  >,
) => {
  return useQuery({
    queryKey: ["hashtag-sugestion", params],
    queryFn: () => getHashtagSugestionApiHandler(params),
    ...options,
  });
};
