import { TicketEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface ListUserTicketApiParams {
  status?: "WAITING" | "OPEN" | "CLOSED";
}

export const listUserTicketApiHandler = async (
  token: string,
  params?: ListUserTicketApiParams,
): Promise<TicketEntity[]> => {
  const { data } = await http.get("/tickets/me", {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const useListUserTicketApi = (
  token: string,
  params?: ListUserTicketApiParams,
  options?: Partial<
    UseQueryOptions<TicketEntity[], AxiosError<ErrorResponseType>>
  >,
) => {
  return useQuery({
    queryKey: ["user-ticket", params?.status ?? "OPEN"],
    queryFn: () => listUserTicketApiHandler(token, params),
    ...options,
  });
};
