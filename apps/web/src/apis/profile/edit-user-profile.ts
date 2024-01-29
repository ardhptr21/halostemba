import { UserEntity } from "@halostemba/entities";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import { EditProfileValidatorType } from "~/validators/profile/edit-profile-validator";

interface EditUserProfileApiResponse extends UserEntity {}

interface EditUserProfileAPiBody extends EditProfileValidatorType {
  token: string;
  name: string;
  email: string;
  username: string;
}

export const editUserProfileApiHandler = async (
  body: EditUserProfileAPiBody,
): Promise<EditUserProfileApiResponse> => {
  const { data } = await http.put("/profile/me", body, {
    headers: {
      Authorization: `Bearer ${body.token}`,
    },
  });
  return data;
};

export const useEditUserProfile = (
  options?: UseMutationOptions<
    EditUserProfileApiResponse,
    AxiosError<ErrorResponseType>,
    EditUserProfileAPiBody
  >,
) => {
  return useMutation({
    mutationFn: editUserProfileApiHandler,
    ...options,
  });
};
