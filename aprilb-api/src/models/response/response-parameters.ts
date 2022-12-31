export interface ResponseParameters<T> {
  data?: T | null;
  errors?: string[] | null;
  success?: boolean;
  statusCode?: number | null;
}
