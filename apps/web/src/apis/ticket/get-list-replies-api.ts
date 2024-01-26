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
  ticketId: string,
  token: string,
  params?: GetListRepliesApiParams,
): Promise<GetListRepliesApiResponse> => {
  const { data } = await http.get(`/tickets/${ticketId}/replies`, {
    params,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
};

export const useGetListRepliesInfiniteApi = (
  ticketId: string,
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
    queryKey: ["replies", ticketId, params],
    queryFn: ({ pageParam }) =>
      getListRepliesApiHandler(ticketId, token, {
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
