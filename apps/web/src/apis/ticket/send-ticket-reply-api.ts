import { MediaEntity } from "@halostemba/entities";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface SendTicketReplyApiBody {
  ticketId: string;
  token: string;
  message: string;
  media: MediaEntity[];
}

export const sendTicketReplyApiHandler = async ({
  ticketId,
  token,
  ...body
}: SendTicketReplyApiBody): Promise<unknown> => {
  const { data } = await http.post(`/tickets/${ticketId}/replies`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data;
};

export const useSendTicketReply = (
  options?: UseMutationOptions<
    unknown,
    AxiosError<ErrorResponseType>,
    SendTicketReplyApiBody
  >,
) => {
  return useMutation({
    mutationFn: sendTicketReplyApiHandler,
    ...options,
  });
};
