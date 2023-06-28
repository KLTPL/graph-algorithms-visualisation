export enum VisualisationPointerToolsM {
  NoTool,
  EmptyField,
  RockField,
  StartField,
  EndField,
}

export enum VisualisationPointerToolsE {
  NoTool,
  NewNode,
  NewEdge,
  Remove,
}

export type AnyVisualisationPointerTool = VisualisationPointerToolsM | VisualisationPointerToolsE;

export default function GraphTools() {
  return <div className="flex flex-col">tools</div>;
}
