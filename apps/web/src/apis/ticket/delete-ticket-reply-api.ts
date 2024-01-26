import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface DeleteTicketReplyApiBody {
  token: string;
  replyId: string;
}

interface DeleteTicketReplyApiResponse {
  message: string;
}

export const deleteTicketReplyApiHandler = async ({
  token,
  replyId,
}: DeleteTicketReplyApiBody): Promise<DeleteTicketReplyApiResponse> => {
  const { data } = await http.delete(`/tickets/replies/${replyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const useDeleteTicketReply = (
  options?: UseMutationOptions<
    DeleteTicketReplyApiResponse,
    AxiosError<ErrorResponseType>,
    DeleteTicketReplyApiBody
  >,
) => {
  return useMutation({
    mutationFn: deleteTicketReplyApiHandler,
    ...options,
  });
};
