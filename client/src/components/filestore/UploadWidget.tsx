import React, { useState } from "react";
import FileUploader from "../util/FileUploader";

const UploadWidget = () => {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | void>();

  const onSetFile = (file: File) => {
    if (!name) {
      setName(file.name);
    }
  };

  return (
    <>
      <label>
        File Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </label>
      <FileUploader file={file} setFile={onSetFile} />
    </>
  );
};

export default UploadWidget;
