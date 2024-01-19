import { AxiosRequestConfig } from "axios";
import { httpCdn } from "~/lib/axios";
import { CDNResponseUploaded } from "~/types/cdn-response-type";

export const uploadMediaCdn = async (
  file: File,
  config?: Partial<AxiosRequestConfig<FormData>>,
): Promise<CDNResponseUploaded> => {
  const formData = new FormData();
  formData.append("media", file);

  const { data } = await httpCdn.post("/upload/media", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  });

  return data;
};
