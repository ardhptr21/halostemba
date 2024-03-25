import { UserEntity } from "@halostemba/entities";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "~/lib/axios";
import ErrorResponseType from "~/types/error-response-type";
import {
  EditEmailValidatorType,
  EditProfileValidatorType,
} from "~/validators/profile/edit-profile-validator";

interface EditUserProfileApiResponse extends UserEntity {}

interface EditUserProfileApiBody extends EditProfileValidatorType {
  token: string;
  name: string;
  username: string;
  email?: string;
}

interface EditEmailApiBody extends EditEmailValidatorType {
  token: string;
  email: string;
}

export const editUserProfileApiHandler = async (
  body: EditUserProfileApiBody,
): Promise<EditUserProfileApiResponse> => {
  const { data } = await http.put("/profile/me", body, {
    headers: {
      Authorization: `Bearer ${body.token}`,
    },
  });
  return data;
};

export const editUserEmailApiHandler = async (
  body: EditEmailApiBody,
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
    EditUserProfileApiBody
  >,
) => {
  return useMutation({
    mutationFn: editUserProfileApiHandler,
    ...options,
  });
};

export const useEditUserEmail = (
  options?: UseMutationOptions<
    EditUserProfileApiResponse,
    AxiosError<ErrorResponseType>,
    EditEmailApiBody
  >,
) => {
  return useMutation({
    mutationFn: editUserEmailApiHandler,
    ...options,
  });
};
