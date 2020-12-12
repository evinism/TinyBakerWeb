import React, { useState, useEffect } from "react";
import { ApiResponse, Transform } from "./types";
import { isSuccess } from "./util";
import { getTransforms } from "./api";

const ListTransforms = () => {
  const [transforms, setTransforms] = useState<ApiResponse<Transform[]>>({
    status: "loading",
  });
  useEffect(() => {
    getTransforms().then((data) => {
      setTransforms({
        status: "success",
        data,
      });
    });
  }, []);
  if (!isSuccess(transforms)) {
    return <div>Loading...</div>;
  }
  return (
    <ul>
      {transforms.data.map((transform) => (
        <li>
          {transform.name}:
          {transform.inputTags.map((tag) => tag.name).join(", ")}→
          {transform.outputTags.map((tag) => tag.name).join(", ")}
        </li>
      ))}
    </ul>
  );
};

export default ListTransforms;
