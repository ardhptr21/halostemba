import { NotificationEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";

interface GetListNotificationApiResponse extends Array<NotificationEntity> {}

export const getListNotificationApiHandler = async (
  token: string,
): Promise<GetListNotificationApiResponse> => {
  const { data } = await http.get("/notifications", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const useListNotificationApi = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetListNotificationApiResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["list-notification"],
    queryFn: () => getListNotificationApiHandler(token),
    ...options,
  });
};
