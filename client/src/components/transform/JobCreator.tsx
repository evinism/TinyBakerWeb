import React, { useState } from "react";
import styled from "styled-components";
import { Transform, Tag } from "../../types";
import FileUploader from "../util/FileUploader";
import { v4 } from "uuid";

const getNewJobId = () => v4().split("-")[0];

interface JobCreatorProps {
  transform: Transform;
}

const IOHeader = styled.h3`
  font-size: 1em;
  font-weight: normal;
  text-align: center;
`;

const TagUploadContainer = styled.div`
  text-align: center;
  border: 1px solid black;
  padding: 0.5em;
  margin: 1em 0;
  border-radius: 0.5em;
  background-color: #fdf;
`;

type TagMap = { [key: string]: File };

const toUploader = (tagMap: TagMap, setTagMap: (tm: TagMap) => unknown) => ({
  name,
}: Tag) => {
  const file = tagMap[name];
  const setFile = (file: File) => {
    setTagMap({
      ...tagMap,
      [name]: file,
    });
  };
  return (
    <TagUploadContainer>
      <IOHeader>{name}</IOHeader>
      <FileUploader file={file} setFile={setFile} />
    </TagUploadContainer>
  );
};

const OutputContainer = styled.div`
  text-align: center;

  border: 1px solid black;
  padding: 0.5em;
  margin: 1em 0;
  border-radius: 0.5em;
  background-color: #ddd;
`;

const toOutputFile = ({ name }: Tag, id: string) => (
  <OutputContainer>
    <IOHeader>{name}</IOHeader>
    Will be output as
    <pre>
      tinybakerweb://jobs/{id}/output/{name}
    </pre>
  </OutputContainer>
);

const JobCreatorContainer = styled.div`
  display: flex;
  > * {
    flex-basis: 0;
    flex-grow: 1;
  }
`;

const InputSide = styled.div`
  padding: 1em;
  border-right: 1px dotted black;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const OutputSide = styled.div`
  padding: 1em;
  border-left: 1px dotted black;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TransformDiagramWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5em;
  &:before,
  &:after {
    padding: 0.5em;
    content: "➔";
  }
`;

const TransformDiagram = styled.div`
  flex-grow: 1;
  text-align: center;
  padding: 2rem;
  border: 1px solid black;
  border-radius: 1em;
`;

const JobCreator = ({ transform }: JobCreatorProps) => {
  // TODO: This doesn't take filesets into account.
  const [id] = useState(getNewJobId());
  const [inputTagMap, setInputTagMap] = useState<TagMap>({});

  return (
    <JobCreatorContainer>
      <InputSide>
        {transform.inputTags.map(toUploader(inputTagMap, setInputTagMap))}
      </InputSide>
      <TransformDiagramWrapper>
        <TransformDiagram>{transform.name}</TransformDiagram>
      </TransformDiagramWrapper>
      <OutputSide>
        {transform.outputTags.map((tag) => toOutputFile(tag, id))}
      </OutputSide>
    </JobCreatorContainer>
  );
};

export default JobCreator;
