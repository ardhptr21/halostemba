import { TicketEntity } from "@halostemba/entities";
import http from "~/lib/axios";

interface GetTicketApiRespone extends TicketEntity {}

export const getTicketApiHandler = async (
  token: string,
  ticketId: string,
): Promise<GetTicketApiRespone> => {
  const { data } = await http.get(`/tickets/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
};
