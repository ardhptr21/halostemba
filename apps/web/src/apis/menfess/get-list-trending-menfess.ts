import { MenfessEntity } from "@halostemba/entities";
import {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import WithMetaResponseType from "~/types/with-meta-response-type";

interface GetListMenfessTrendingApiResponse
  extends WithMetaResponseType<MenfessEntity[]> {}

interface GetListTrendingMenfessApiParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const getListTrendingMenfessApiHandler = async (
  token?: string | null,
  params?: GetListTrendingMenfessApiParams,
): Promise<GetListMenfessTrendingApiResponse> => {
  const { data } = await http.get("/menfess/popular", {
    params,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
};

export const useGetListTrendingMenfessApi = (
  token?: string | null,
  params?: GetListTrendingMenfessApiParams,
  options?: UseQueryOptions<
    GetListMenfessTrendingApiResponse,
    AxiosError<ErrorResponseType>
  >,
) => {
  return useQuery({
    queryKey: ["trending-menfess", params],
    queryFn: () => getListTrendingMenfessApiHandler(token, params),
    ...options,
  });
};

export const useGetListTrendingMenfessInfiniteApi = (
  token?: string | null,
  params?: GetListTrendingMenfessApiParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      GetListMenfessTrendingApiResponse,
      AxiosError<any>,
      InfiniteData<WithMetaResponseType<MenfessEntity[]>>
    >
  >,
) => {
  return useInfiniteQuery({
    queryKey: ["trending-menfess", params],
    queryFn: ({ pageParam }) =>
      getListTrendingMenfessApiHandler(token, {
        ...params,
        page: pageParam as number,
      }),
    initialPageParam: 1,
    getNextPageParam: (current) => {
      return current.meta.next;
    },
    ...options,
  });
};
