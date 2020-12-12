import {
  ApiResponse,
  ResponseSuccess,
  ResponseFailure,
  ResponseLoading,
} from "./types";

export const isSuccess = <T>(
  response: ApiResponse<T>
): response is ResponseSuccess<T> => response.status === "success";

export const isFailure = <T>(
  response: ApiResponse<T>
): response is ResponseFailure => response.status === "failure";

export const isLoading = <T>(
  response: ApiResponse<T>
): response is ResponseLoading => response.status === "loading";

export function fullyQualify<T>(
  partial: Partial<T>,
  defaults: Partial<T> = {}
): T {
  const out: Partial<T> = {};
  Object.entries(partial).forEach(([key_uncasted, value]) => {
    const key = key_uncasted as keyof T;
    if (value !== undefined) {
      out[key] = value as any;
      return;
    }
    const default_value = defaults[key];
    if (default_value !== undefined) {
      out[key] = default_value;
    }
    throw new Error(`Expected value for key ${key}`);
  });
  return out as T;
}
