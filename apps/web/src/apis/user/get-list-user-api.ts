import { UserEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { User } from "next-auth";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import WithMetaResponseType from "~/types/with-meta-response-type";

interface GetListUsersApiResponse extends WithMetaResponseType<UserEntity[]> {}

interface GetListUsersApiParams {
  page?: number;
  perPage?: number;
  search?: string | null;
  role?: User["role"] | null;
  sortBy?: "name" | "createdAt";
  order?: "asc" | "desc";
}

export const getListUsersApiHandler = async (
  token: string,
  params?: GetListUsersApiParams,
): Promise<GetListUsersApiResponse> => {
  const { data } = await http.get("/users", {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
export const useGetListUsers = (
  token: string,
  params?: GetListUsersApiParams,
  options?: Partial<
    UseQueryOptions<GetListUsersApiResponse, AxiosError<ErrorResponseType>>
  >,
) => {
  return useQuery({
    queryKey: ["users", "list", params],
    queryFn: () => getListUsersApiHandler(token, params),
    ...options,
  });
};
