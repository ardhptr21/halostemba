export interface CDNResponseUploaded {
  status: number;
  message: string;
  url: string;
}

export interface CDNResponseError {
  status: number;
  message: string;
  error: string;
}
