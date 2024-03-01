import { MajorEntity } from "@halostemba/entities";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";

export const getListMajorsApiHandler = async (): Promise<MajorEntity[]> => {
  const { data } = await http.get("/majors");
  return data;
};

export const useGetListMajors = (
  options?: Partial<
    UseQueryOptions<MajorEntity[], AxiosError<ErrorResponseType>>
  >,
) => {
  return useQuery({
    queryKey: ["majors"],
    queryFn: getListMajorsApiHandler,
    ...options,
  });
};
