import {
  TransformApiFactory,
  FilestoreApiFactory,
  JobsApiFactory,
} from "./api-gen";
import { Transform } from "./types";

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
