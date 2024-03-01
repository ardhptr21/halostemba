import { MajorEntity } from "@halostemba/entities";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import { CreateMajorValidatorType } from "~/validators/major/create-major-validator";

interface EditMajorApiResponse extends MajorEntity {}

interface EditMajorApiBody extends CreateMajorValidatorType {
  id: string;
  name: string;
  token: string;
}

const editMajorApiHandler = async ({
  id,
  token,
  ...body
}: EditMajorApiBody): Promise<EditMajorApiResponse> => {
  const { data } = await http.patch(`/majors/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditMajor = (
  options?: UseMutationOptions<
    EditMajorApiResponse,
    AxiosError<ErrorResponseType>,
    EditMajorApiBody
  >,
) => {
  return useMutation({
    mutationFn: editMajorApiHandler,
    ...options,
  });
};
