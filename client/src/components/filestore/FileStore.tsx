import React from "react";
import UploadWidget from "./UploadWidget";
import styled from "styled-components";
import useResource from "../../useResource";
import { getFiles } from "../../api";
import SpinErr from "../util/SpinErr";

const PageWrapper = styled.div`
  display: flex;
`;

const FileStore = () => {
  const fileApiResponse = useResource(getFiles);

  return (
    <SpinErr apiResponse={fileApiResponse}>
      {(files) => (
        <PageWrapper>
          <div>
            Big ol' list of available files
            <ol>
              {files.map(({ path }) => (
                <li>{path}</li>
              ))}
            </ol>
          </div>
          <UploadWidget />
        </PageWrapper>
      )}
    </SpinErr>
  );
};

export default FileStore;
