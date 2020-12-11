import React, { useState, useEffect } from "react";
import { ApiResponse, Transform } from "./types";
import { isSuccess } from "./util";

const ListTransforms = () => {
  const [transforms, setTransforms] = useState<ApiResponse<Transform[]>>({
    status: "loading",
  });
  useEffect(() => {
    fetch("/api/transforms")
      .then((response) => response.json())
      .then((json) => {
        const data = json.data as Transform[];
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
          {transform.name}:{transform.input_tags.join(", ")}→
          {transform.output_tags.join(", ")}
        </li>
      ))}
    </ul>
  );
};

export default ListTransforms;
