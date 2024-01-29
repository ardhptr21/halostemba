import { CommentWithMenfessEntity } from "@halostemba/entities";
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

interface GetListUserCommentApiResponse
  extends WithMetaResponseType<CommentWithMenfessEntity[]> {}

interface GetListUserCommentApiParams {
  token?: string;
  page?: number;
  perPage?: number;
}

export const getListUserCommentApiHandler = async (
  username: string,
  params?: GetListUserCommentApiParams,
): Promise<GetListUserCommentApiResponse> => {
  const { data } = await http.get(`/comments/${username}`, {
    params,
    headers: { Authorization: `Bearer ${params?.token}` },
  });

  return data;
};

export const useGetListUserCommentApi = (
  username: string,
  params?: GetListUserCommentApiParams,
  options?: UseQueryOptions<
    GetListUserCommentApiResponse,
    AxiosError<ErrorResponseType>
  >,
) => {
  return useQuery({
    queryKey: ["list-comment", params],
    queryFn: () => getListUserCommentApiHandler(username, params),
    ...options,
  });
};

export const useGetListUserCommentInfiniteApi = (
  username: string,
  params?: GetListUserCommentApiParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      GetListUserCommentApiResponse,
      AxiosError<any>,
      InfiniteData<GetListUserCommentApiResponse>
    >
  >,
) => {
  return useInfiniteQuery({
    queryKey: ["list-comment", params],
    queryFn: () => getListUserCommentApiHandler(username, params),
    initialPageParam: 1,
    getNextPageParam: (current) => {
      return current.meta.next;
    },
    ...options,
  });
};
