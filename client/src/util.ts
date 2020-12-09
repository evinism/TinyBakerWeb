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
