import { ApiResponse } from "../types";
import { isLoading, isFailure } from "../util";

interface SpinErrProps<T> {
  apiResponse: ApiResponse<T>;
  children: (data: T) => JSX.Element;
}

function SpinErr<T>({ apiResponse, children }: SpinErrProps<T>) {
  if (isLoading(apiResponse)) {
    return <div>Loading...</div>;
  }
  if (isFailure(apiResponse)) {
    return (
      <div>
        <h2>Error!</h2>
        <pre>{apiResponse.message}</pre>
      </div>
    );
  }
  return children(apiResponse.data);
}

export default SpinErr;
