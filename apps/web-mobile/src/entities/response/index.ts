import type { AxiosError } from 'axios';

type Error = {
  error: string[];
  errors: {
    code: string;
    message: string;
  }[];
};

type Response<Data> = {
  data: Data;
};

export type ApiError = AxiosError<Error>;
export type ApiResponse<Data> = Response<Data>;
