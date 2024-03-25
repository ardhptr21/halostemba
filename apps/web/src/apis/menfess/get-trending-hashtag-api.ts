import { HashtagEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface GetTrendingHashtagApiResponse extends HashtagEntity {}

export const getTrendingHashtagApiHandler = async (): Promise<
  GetTrendingHashtagApiResponse[]
> => {
  const { data } = await http.get("/hashtags/popular");

  return data.data;
};

export const useGetTrendingHashtagApi = (
  options?: Partial<
    UseQueryOptions<
      GetTrendingHashtagApiResponse[],
      AxiosError<ErrorResponseType>
    >
  >,
) => {
  return useQuery({
    queryKey: ["popular-hashtag"],
    queryFn: () => getTrendingHashtagApiHandler(),
    ...options,
  });
};
