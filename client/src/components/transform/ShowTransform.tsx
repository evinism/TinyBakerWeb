import React from "react";
import { useParams } from "react-router-dom";
import { getTransform } from "../../api";
import useResource from "../../useResource";
import SpinErr from "../util/SpinErr";
import TransformFlowDiagram from "./TransformFlowDiagram";
import JobCreator from "./JobCreator";

const ShowTransform = () => {
  const { transformId } = useParams<{ transformId?: string }>();
  const transforms = useResource(
    () => getTransform(parseInt(transformId, 10)),
    transformId
  );
  return (
    <SpinErr apiResponse={transforms}>
      {(transform) => (
        <div>
          <h2>{transform.name}</h2>
          {transform.inputTags.map((tag) => tag.name).join(", ")}→
          {transform.outputTags.map((tag) => tag.name).join(", ")}
          <TransformFlowDiagram transform={transform} />
          <JobCreator transform={transform} />
        </div>
      )}
    </SpinErr>
  );
};

export default ShowTransform;
