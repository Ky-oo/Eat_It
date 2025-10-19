import type { User, GoogleUser } from "./User";

export type ApiResponse<T> = {
  data: T;
  status: "success" | "error";
  message?: string;
};

export type FormField<T> = {
  value: T;
  error: string | null;
  touched: boolean;
};

export type ApiError = {
  message: string;
  status: number;
};

export type GoogleAuthResponse = {
  access_token: string;
  refresh_token: string;
  user: GoogleUser;
};
