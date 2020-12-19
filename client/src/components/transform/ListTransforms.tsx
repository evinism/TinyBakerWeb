import React from "react";
import { Link } from "react-router-dom";
import { getTransforms } from "../../api";
import useResource from "../../useResource";
import SpinErr from "../util/SpinErr";

const ListTransforms = () => {
  const transforms = useResource(getTransforms);
  return (
    <SpinErr apiResponse={transforms}>
      {(data) => (
        <ul>
          {data.map((transform, idx) => (
            <li>
              <Link to={`/transforms/${transform.id}`}>{transform.name}</Link>:
              {transform.inputTags.map((tag) => tag.name).join(", ")}→
              {transform.outputTags.map((tag) => tag.name).join(", ")}
            </li>
          ))}
        </ul>
      )}
    </SpinErr>
  );
};

export default ListTransforms;
