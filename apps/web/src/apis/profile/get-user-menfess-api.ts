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

interface GetListUserMenfessApiResponse
  extends WithMetaResponseType<MenfessEntity[]> {}

interface GetListUserMenfessApiParams {
  token?: string;
  page?: number;
  perPage?: number;
}

export const getListUserMenfessApiHandler = async (
  username: string,
  params?: GetListUserMenfessApiParams,
): Promise<GetListUserMenfessApiResponse> => {
  const { data } = await http.get(`/menfess/users/${username}`, {
    params,
    headers: { Authorization: `Bearer ${params?.token}` },
  });

  return data;
};

export const useGetListUserMenfessApi = (
  username: string,
  params?: GetListUserMenfessApiParams,
  options?: UseQueryOptions<
    GetListUserMenfessApiResponse,
    AxiosError<ErrorResponseType>
  >,
) => {
  return useQuery({
    queryKey: ["list-menfess", params],
    queryFn: () => getListUserMenfessApiHandler(username, params),
    ...options,
  });
};

export const useGetListUserMenfessInfiniteApi = (
  username: string,
  params?: GetListUserMenfessApiParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      GetListUserMenfessApiResponse,
      AxiosError<any>,
      InfiniteData<GetListUserMenfessApiResponse>
    >
  >,
) => {
  return useInfiniteQuery({
    queryKey: ["list-menfess", params],
    queryFn: () => getListUserMenfessApiHandler(username, params),
    initialPageParam: 1,
    getNextPageParam: (current) => {
      return current.meta.next;
    },
    ...options,
  });
};
