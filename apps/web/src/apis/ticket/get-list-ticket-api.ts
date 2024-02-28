import { TicketEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import WithMetaResponseType from "~/types/with-meta-response-type";

export type IsTicketAdmin = "ADMIN";
export type IsTicketTeacher = "TEACHER";

type GetTicketResponse<T = IsTicketAdmin | IsTicketTeacher> =
  T extends IsTicketAdmin
    ? WithMetaResponseType<TicketEntity[]>
    : TicketEntity[];

type GetTicketApiResponse<T = IsTicketAdmin | IsTicketTeacher> =
  GetTicketResponse<T>;

interface GetTicketApiParams {
  status?: "WAITING" | "OPEN" | "CLOSED";
  search?: string;
  page?: number;
  perPage?: number;
}

export const getTicketListApiHandler = async <T>(
  token: string,
  params?: GetTicketApiParams,
): Promise<GetTicketApiResponse<T>> => {
  const { data } = await http.get(`/tickets`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetTicketListApi = <T>(
  token: string,
  params?: GetTicketApiParams,
  options?: Partial<
    UseQueryOptions<GetTicketApiResponse<T>, AxiosError<ErrorResponseType>>
  >,
) => {
  return useQuery({
    queryKey: ["ticket", params],
    queryFn: () => getTicketListApiHandler<T>(token, params),
    ...options,
  });
};
