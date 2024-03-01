import { DashboardStatisticsEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

export const getStatisticsApiHandler = async (
  token: string,
): Promise<DashboardStatisticsEntity> => {
  const { data } = await http.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetStatistics = (
  token: string,
  options?: Partial<
    UseQueryOptions<DashboardStatisticsEntity, AxiosError<ErrorResponseType>>
  >,
) => {
  return useQuery({
    queryKey: ["dashboard", "statistics"],
    queryFn: () => getStatisticsApiHandler(token),
    ...options,
  });
};
