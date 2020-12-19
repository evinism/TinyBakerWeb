import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ onDrop }: { onDrop: (file: File) => void }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => files[0] && onDrop(files[0]),
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

interface FileUploaderProps {
  file: File | void;
  setFile: (file: File | void) => void;
}

const FileUploader = ({ file, setFile }: FileUploaderProps) => {
  let fileSlot: JSX.Element;
  if (!file) {
    fileSlot = <DropZone onDrop={setFile} />;
  } else {
    fileSlot = (
      <div>
        {file.name} <button onClick={() => setFile()}>X</button>
      </div>
    );
  }
  return <div>{fileSlot}</div>;
};

export default FileUploader;
