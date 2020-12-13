import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";

import styled from "styled-components";

import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { Structure, Transform } from "../types";

// Right now, this component is a singleton.
const engine = createEngine();

const buildNodes = (structure: Structure) => {
  const purp = "rgb(160,90,190)";

  const inputNode = new DefaultNodeModel({
    name: "Inputs",
    color: purp,
  });
  inputNode.setPosition(10, 10);

  const outputNode = new DefaultNodeModel({
    name: "Outputs",
    color: purp,
  });
  outputNode.setPosition(400, 10);

  const transformNode = new DefaultNodeModel({
    name: structure.name,
    color: "rgb(0,192,255)",
  });
  transformNode.setPosition(100, 10);

  const inputNodePorts = structure.input_tags.map((tag) => {
    inputNode.addOutPort(tag);
    transformNode.addInPort(tag);
    return {};
  });
  const outputNodePorts = structure.output_tags.map((tag) => {
    outputNode.addInPort(tag);
    transformNode.addOutPort(tag);
    return {};
  });

  const model = new DiagramModel();
  model.addAll(inputNode, transformNode, outputNode);
  engine.setModel(model);
};

const Wrapper = styled.div`
  > * {
    height: 20em;
    min-height: 20em;
    width: 100%;
  }
`;

const TransformFlowDiagram = ({ transform }: { transform: Transform }) => {
  buildNodes(transform.structure);
  return (
    <>
      <Wrapper>
        <CanvasWidget engine={engine} />
      </Wrapper>
      <pre>{JSON.stringify(transform.structure, null, 2)}</pre>
    </>
  );
};

export default TransformFlowDiagram;
