import { TicketEntity } from "@halostemba/entities";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import MediaRequestType from "~/types/media-request-type";
import { CreateTicketValidatorType } from "~/validators/ticket/create-ticket-validator";

interface CreateTicketApiResponse extends TicketEntity {}

interface CreateTicketApiBody extends CreateTicketValidatorType {
  token: string;
  media?: MediaRequestType[];
}

export const createTicketApiHandler = async ({
  token,
  ...body
}: CreateTicketApiBody): Promise<CreateTicketApiResponse> => {
  const { data } = await http.post("/tickets", body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data;
};

export const useCreateTicket = (
  options?: UseMutationOptions<
    CreateTicketApiResponse,
    AxiosError<ErrorResponseType>,
    CreateTicketApiBody
  >,
) => {
  return useMutation({
    mutationFn: createTicketApiHandler,
    ...options,
  });
};
