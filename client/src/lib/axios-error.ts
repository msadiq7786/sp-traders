import axios from "axios";

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  data: null;
  message: string;
  errors: unknown[];
}

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? "Something went wrong";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};
