import { TicketEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import WithMetaResponseType from "~/types/with-meta-response-type";

interface GetTicketApiRespone extends WithMetaResponseType<TicketEntity[]> {}

interface GetTicketApiParams {
  status?: "WAITING" | "OPEN" | "CLOSED";
  search?: string;
  page?: number;
  perPage?: number;
}

export const getTicketListApiHandler = async (
  token: string,
  params?: GetTicketApiParams,
): Promise<GetTicketApiRespone> => {
  const { data } = await http.get(`/tickets`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetTicketListApi = (
  token: string,
  params?: GetTicketApiParams,
  options?: Partial<
    UseQueryOptions<GetTicketApiRespone, AxiosError<ErrorResponseType>>
  >,
) => {
  return useQuery({
    queryKey: ["ticket", params],
    queryFn: () => getTicketListApiHandler(token, params),
    ...options,
  });
};
