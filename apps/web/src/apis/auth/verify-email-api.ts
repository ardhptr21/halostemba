import http from "~/lib/axios";

interface VerifyEmailApiResponse {
  message: string;
}

interface VerifyEmailApiBody {
  token: string;
}

export const verifyEmailApiHandler = async (body: VerifyEmailApiBody) => {
  const { data } = await http.post<VerifyEmailApiResponse>(
    "/auth/verify-email",
    body,
  );

  return data;
};
