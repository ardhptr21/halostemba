import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";

interface GetNotificationCountApiResponse {
  count: number;
}

export const getNotificationCountApiHandler = async (
  token: string,
): Promise<GetNotificationCountApiResponse> => {
  const { data } = await http.get("/notifications/unread", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const useNotificationCountApi = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetNotificationCountApiResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["notification-count"],
    queryFn: () => getNotificationCountApiHandler(token),
    ...options,
  });
};
