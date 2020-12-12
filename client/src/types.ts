export type ResponseLoading = { status: "loading" };
export type ResponseSuccess<T> = { status: "success"; data: T };
export type ResponseFailure = { status: "failure"; message: string };

export type ApiResponse<T> =
  | ResponseLoading
  | ResponseSuccess<T>
  | ResponseFailure;

export interface Tag {
  name: string;
  type: "file" | "fileset";
}

export interface Transform {
  id: number;
  name: string;
  inputTags: Array<Tag>;
  outputTags: Array<Tag>;
}
