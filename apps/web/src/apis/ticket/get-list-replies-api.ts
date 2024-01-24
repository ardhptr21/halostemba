import { TicketReplyEntity } from "@halostemba/entities";
import {
  InfiniteData,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import WithMetaResponseType from "~/types/with-meta-response-type";

interface GetListRepliesApiResponse
  extends WithMetaResponseType<TicketReplyEntity[]> {}

interface GetListRepliesApiParams {
  page?: number;
  perPage?: number;
}

export const getListRepliesApiHandler = async (
  id: string,
  token: string,
  params?: GetListRepliesApiParams,
): Promise<GetListRepliesApiResponse> => {
  const { data } = await http.get(`/tickets/${id}/replies`, {
    params,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
};

export const useGetListRepliesInfiniteApi = (
  id: string,
  token: string,
  params?: GetListRepliesApiParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      GetListRepliesApiResponse,
      AxiosError<any>,
      InfiniteData<GetListRepliesApiResponse>
    >
  >,
) => {
  return useInfiniteQuery({
    queryKey: ["replies", id, params],
    queryFn: ({ pageParam }) =>
      getListRepliesApiHandler(id, token, {
        ...params,
        page: pageParam as number,
      }),
    initialPageParam: 1,
    getNextPageParam: (current) => {
      return current.meta.next;
    },
    select: (data) => ({
      pages: [...data.pages].reverse(),
    }),
    ...options,
  });
};
