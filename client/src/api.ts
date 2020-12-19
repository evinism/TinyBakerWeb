import {
  TransformApiFactory,
  FilestoreApiFactory,
  JobsApiFactory,
} from "./api-gen";
import { Transform, FileRecord } from "./types";

import { fullyQualify } from "./util";

const transformApi = TransformApiFactory();
const jobsApi = JobsApiFactory();
const filestoreApi = FilestoreApiFactory();

export function getTransforms(): Promise<Transform[]> {
  return transformApi
    .getTransforms()
    .then((transforms) =>
      transforms.data.map((transform) => fullyQualify(transform))
    );
}

export function getTransform(id: number): Promise<Transform> {
  return transformApi
    .getTransformById(id)
    .then((transform) => fullyQualify(transform.data));
}

export function getFiles(): Promise<FileRecord[]> {
  return filestoreApi
    .getFiles()
    .then((files) => files.data.map((file) => fullyQualify(file)));
}
