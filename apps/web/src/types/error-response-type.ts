export default interface ErrorResponseType {
  errors?: {
    [key: string]: string;
  } | null;
  message?: string | null;
  error: string | null;
  statusCode: number;
}
