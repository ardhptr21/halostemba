import http from "~/lib/axios";

interface VerifyEmailApiResponse {
  message: string;
}

interface VerifyEmailApiBody {
  token: string;
  authtoken: string;
}

export const verifyEmailApiHandler = async ({
  token,
  authtoken,
}: VerifyEmailApiBody) => {
  const { data } = await http.post<VerifyEmailApiResponse>(
    "/auth/verify-email?token=" + token,
    null,
    {
      headers: { Authorization: `Bearer ${authtoken}` },
    },
  );

  return data;
};
