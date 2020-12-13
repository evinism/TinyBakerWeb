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
  structure: Structure;
}

// Warning: This is confusing and duplicated logic from within tinybaker!

interface BaseStructure {
  name: string;
  input_tags: string[];
  output_tags: string[];
}

interface LeafStructure extends BaseStructure {
  type: "leaf";
}

interface SequenceStructure extends BaseStructure {
  type: "sequence";
  steps: Structure[];
}

interface MergeStructure extends BaseStructure {
  type: "merge";
  steps: Structure[];
}

interface MapStructure extends BaseStructure {
  type: "map";
  // Missing some structure!!
  base_step: Structure[];
}

export type Structure =
  | LeafStructure
  | SequenceStructure
  | MergeStructure
  | MapStructure;
