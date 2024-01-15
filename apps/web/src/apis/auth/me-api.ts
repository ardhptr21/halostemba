import { UserEntity } from "@halostemba/entities";
import http from "~/lib/axios";

export const meAuthApi = async (token: string): Promise<UserEntity> => {
  const { data } = await http.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
