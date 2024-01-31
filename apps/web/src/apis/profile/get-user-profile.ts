import { UserEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";

interface GetUserProfileApiResponse extends UserEntity {}

export const getUserProfileApiHandler = async (
  username: string,
): Promise<GetUserProfileApiResponse> => {
  const { data } = await http.get("/profile/" + username);
  return data.data;
};

export const useGetUserProfileApi = (
  username: string,
  options?: Partial<UseQueryOptions<GetUserProfileApiResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => getUserProfileApiHandler(username),
    ...options,
  });
};
