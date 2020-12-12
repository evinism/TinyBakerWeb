import { useEffect, useState } from "react";
import { ApiResponse } from "./types";

export default function useResource<T, N>(
  kickoff: () => Promise<T>,
  key: N | undefined = undefined
): ApiResponse<T> {
  const [t, setT] = useState<ApiResponse<T>>({
    status: "loading",
  });
  useEffect(() => {
    kickoff()
      .then((data) => {
        setT({
          status: "success",
          data,
        });
      })
      .catch((err) => {
        setT({
          status: "failure",
          message: err.message,
        });
      });
  }, [key]);
  return t;
}
