import { MenfessWithCommentEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";

interface GetDetailMenfessApiResponse extends MenfessWithCommentEntity {}

export const getDetailMenfessApiHandler = async (
  id: string,
  token?: string | null,
): Promise<GetDetailMenfessApiResponse> => {
  const { data } = await http.get("/menfess/" + id, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  return data.data;
};

export const useDetailMenfessApi = (
  id: string,
  token?: string | null,
  options?: UseQueryOptions<GetDetailMenfessApiResponse, AxiosError>,
) => {
  return useQuery({
    queryKey: ["detail-menfess", id],
    queryFn: () => getDetailMenfessApiHandler(id, token),
    ...options,
  });
};
