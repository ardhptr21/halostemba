import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { httpCdn } from "~/lib/axios";
import { CDNResponseUploaded } from "~/types/cdn-response-type";
import ErrorResponseType from "~/types/error-response-type";

export const uploadMediaCdn = async (
  file: File,
  target: "avatar" | "card" | "media" = "media",
  config?: Partial<AxiosRequestConfig<FormData>>,
): Promise<CDNResponseUploaded> => {
  const formData = new FormData();
  formData.append(target, file);

  const { data } = await httpCdn.post("/upload/" + target, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  });

  return data;
};

interface UploadMediaCdnBody {
  file: File;
  target: "avatar" | "card" | "media";
  config?: Partial<AxiosRequestConfig<FormData>>;
}

const uploaderMutation = async (body: UploadMediaCdnBody) => {
  return await uploadMediaCdn(body.file, body.target, body.config);
};

export const useUploadMediaCdn = (
  options?: UseMutationOptions<
    CDNResponseUploaded,
    AxiosError<ErrorResponseType>,
    UploadMediaCdnBody
  >,
) => {
  return useMutation({
    mutationFn: uploaderMutation,
    ...options,
  });
};
