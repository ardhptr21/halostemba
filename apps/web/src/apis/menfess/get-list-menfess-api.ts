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

interface GetListMenfessApiResponse
  extends WithMetaResponseType<MenfessEntity[]> {}

interface GetListMenfessApiParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const getListMenfessApiHandler = async (
  token?: string | null,
  params?: GetListMenfessApiParams,
): Promise<GetListMenfessApiResponse> => {
  const { data } = await http.get("/menfess", {
    params,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
};

export const useGetListMenfessApi = (
  token?: string | null,
  params?: GetListMenfessApiParams,
  options?: UseQueryOptions<
    GetListMenfessApiResponse,
    AxiosError<ErrorResponseType>
  >,
) => {
  return useQuery({
    queryKey: ["list-menfess", params],
    queryFn: () => getListMenfessApiHandler(token, params),
    ...options,
  });
};

export const useGetListMenfessInfiniteApi = (
  token?: string | null,
  params?: GetListMenfessApiParams,
  options?: UseInfiniteQueryOptions<
    GetListMenfessApiResponse,
    AxiosError<any>,
    InfiniteData<WithMetaResponseType<MenfessEntity[]>>
  >,
) => {
  return useInfiniteQuery({
    queryKey: ["list-menfess", params],
    queryFn: ({ pageParam }) =>
      getListMenfessApiHandler(token, { ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (current) => {
      return current.meta.next;
    },
    ...options,
  });
};
