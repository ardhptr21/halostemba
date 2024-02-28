import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface respondToTicketApiBody {
  token: string;
  ticketId: string;
}

const respondToTicketApiHandler = async ({
  token,
  ticketId,
}: respondToTicketApiBody) => {
  const { data } = await http.patch(`/tickets/${ticketId}/respond`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useRespondToTicket = (
  options?: Partial<
    UseMutationOptions<any, AxiosError<ErrorResponseType>, any>
  >,
) => {
  return useMutation({
    mutationFn: respondToTicketApiHandler,
    ...options,
  });
};
