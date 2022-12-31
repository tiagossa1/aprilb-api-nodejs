import type { ResponseParameters } from "./response-parameters.js";

class BaseResponse<T = null> {
  errors: string[];
  data: T | null;
  success: boolean;
  statusCode: number;

  constructor(params: ResponseParameters<T>) {
    this.errors = params.errors ?? [];
    this.data = params.data ? params.data : null;
    this.success = params.success
      ? params.success
      : (params.data && !params.errors) ?? false;

    this.statusCode =
      params.statusCode ? params.statusCode : (!this.success ? 400 : 200);
  }
}

export default BaseResponse;
