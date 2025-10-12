import type { User } from "./User";

// Utility types utilisés dans l'application
export type ApiResponse<T> = {
  data: T;
  status: "success" | "error";
  message?: string;
};

// Type pour les formulaires (utilisé dans login/register)
export type FormField<T> = {
  value: T;
  error: string | null;
  touched: boolean;
};

// Pour typer les erreurs d'API
export type ApiError = {
  message: string;
  status: number;
};
