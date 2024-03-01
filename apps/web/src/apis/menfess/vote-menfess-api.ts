import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

interface VoteMenfessApiResponse {
  message: string;
}

interface VoteMenfessApiBody {
  token: string;
  menfessId: string;
  type: "UP" | "DOWN";
}

export const VoteMenfessApiHandler = async (
  body: VoteMenfessApiBody,
): Promise<VoteMenfessApiResponse> => {
  const { data } = await http.patch(
    "/vote",
    {
      menfessId: body.menfessId,
      type: body.type,
    },
    { headers: { Authorization: `Bearer ${body.token}` } },
  );

  return data;
};

export const useVoteMenfess = (
  options?: UseMutationOptions<
    VoteMenfessApiResponse,
    AxiosError<ErrorResponseType>,
    VoteMenfessApiBody
  >,
) => {
  return useMutation({
    mutationFn: VoteMenfessApiHandler,
    ...options,
  });
};
