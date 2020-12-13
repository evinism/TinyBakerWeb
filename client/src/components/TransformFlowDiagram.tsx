import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DefaultPortModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";

import styled from "styled-components";

import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { Structure, Transform } from "../types";

function lock(port: DefaultPortModel) {
  port.setLocked(true);
  return port;
}

// Right now, this component is a singleton.
const engine = createEngine();

type PortClosure = { [key: string]: DefaultPortModel };

const buildNodesHelper = (
  structure: Structure,
  closure: PortClosure,
  diagram: DiagramModel
) => {
  const transformNode = new DefaultNodeModel({
    name: structure.name,
    color: "rgb(0,192,255)",
  });

  diagram.addNode(transformNode);

  structure.input_tags.forEach((tag) => {
    const clPort = closure[tag]!; // We know this exists because we're cool
    const outPort = lock(transformNode.addInPort(tag));
    const link = clPort.link<DefaultLinkModel>(outPort);
    diagram.addLink(link);
  });

  structure.output_tags.forEach((tag) => {
    closure[tag] = lock(transformNode.addOutPort(tag));
  });
};

const buildNodes = (structure: Structure) => {
  const purp = "rgb(160,90,190)";

  const diagram = new DiagramModel();

  // This is canonical-- it gets passed through and modified by everything
  const closure: PortClosure = {};

  // === SET UP INPUT AND OUTPUT NODES ===

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

  diagram.addAll(inputNode, outputNode);

  structure.input_tags.forEach((tag) => {
    closure[tag] = lock(inputNode.addOutPort(tag));
  });

  // MAIN SEQUENCE

  buildNodesHelper(structure, closure, diagram);

  // AND FINISH UP
  structure.output_tags.forEach((tag) => {
    const clPort = closure[tag]!; // We know this exists because we're cool
    const outPort = lock(outputNode.addInPort(tag));
    const link = clPort.link<DefaultLinkModel>(outPort);
    diagram.addLink(link);
  });

  engine.setModel(diagram);
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
    <Wrapper>
      <CanvasWidget engine={engine} />
    </Wrapper>
  );
};

export default TransformFlowDiagram;
