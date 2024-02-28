import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface closeTicketApiBody {
  token: string;
  ticketId: string;
}

interface closeTicketApiResponse {
  message: string;
}

export const closeTicketApiHandler = async ({
  token,
  ticketId,
}: closeTicketApiBody): Promise<closeTicketApiResponse> => {
  const { data } = await http.patch(`/tickets/${ticketId}/close`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const useCloseTicket = (
  options?: UseMutationOptions<
    closeTicketApiResponse,
    AxiosError<ErrorResponseType>,
    closeTicketApiBody
  >,
) => {
  return useMutation({
    mutationFn: closeTicketApiHandler,
    ...options,
  });
};
