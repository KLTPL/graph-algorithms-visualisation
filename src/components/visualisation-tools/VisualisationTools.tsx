import {
  useVisualisationData,
  useVisualisationPointerTools,
} from "../../context/Context";
import { UserGraphTypes } from "../../visualisationData/typesGraphData";
import { AnyVisualisationData } from "../../visualisationData/typesVisualisationData";
import SelectToolsE from "./SelectToolsE";
import SelectToolsM from "./SelectToolsM";

export enum VisualisationPointerTools {
  NoTool,
  EmptyField,
  RockField,
  StartField,
  EndField,
  NewNode,
  NewEdge,
  RemoveEdgeOrNode,
}

export default function GraphTools() {
  const { visualisationData } = useVisualisationData();
  return (
    <div className="flex flex-col">
      {getProperSelectElement(visualisationData)}
    </div>
  );
}

function getProperSelectElement({ graphType }: AnyVisualisationData) {
  if (graphType === UserGraphTypes.M) {
    return <SelectToolsM />;
  }
  return <SelectToolsE />;
}
