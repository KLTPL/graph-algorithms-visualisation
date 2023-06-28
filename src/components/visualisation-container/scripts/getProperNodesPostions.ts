import { UserGraphTypes } from "../../../visualisationData/typesGraphData";
import { AnyVisualisationData } from "../../../visualisationData/typesVisualisationData";

export type NodePosition = { left: number; top: number };
export type NodesPositions = NodePosition[];

const nodesPositionsU: NodesPositions = [
  { left: 40, top: 75 },
  { left: 25, top: 25 },
  { left: 55, top: 15 },
  { left: 70, top: 30 },
  { left: 75, top: 15 },
  { left: 90, top: 40 },
  { left: 85, top: 60 },
  { left: 60, top: 55 },
  { left: 45, top: 45 },
  { left: 30, top: 55 },
  { left: 10, top: 50 },
  { left: 70, top: 90 },
  { left: 35, top: 20 },
];

const nodesPositionsUW: NodesPositions = [
  { left: 30, top: 20 },
  { left: 10, top: 50 },
  { left: 30, top: 70 },
  { left: 50, top: 20 },
  { left: 50, top: 70 },
  { left: 60, top: 50 },
  { left: 70, top: 20 },
  { left: 70, top: 70 },
  { left: 90, top: 50 },
];

const nodesPositionsD: NodesPositions = [
  { left: 20, top: 30 },
  { left: 25, top: 80 },
  { left: 10, top: 70 },
  { left: 30, top: 60 },
  { left: 35, top: 15 },
  { left: 50, top: 20 },
  { left: 45, top: 90 },
  { left: 60, top: 65 },
  { left: 65, top: 80 },
  { left: 70, top: 50 },
  { left: 70, top: 10 },
  { left: 80, top: 65 },
  { left: 90, top: 45 },
];

const nodesPositionsDW: NodesPositions = [
  { left: 10, top: 50 },
  { left: 30, top: 20 },
  { left: 30, top: 80 },
  { left: 50, top: 50 },
  { left: 70, top: 20 },
  { left: 70, top: 50 },
  { left: 70, top: 80 },
  { left: 90, top: 50 },
];



function getProperNodesPosition({
  graphType,
}: AnyVisualisationData): NodesPositions {
  if (graphType === UserGraphTypes.M) {
    throw new Error(
      "graph type is matrix when rendering an edge graph component"
    );
  }
  switch (graphType) {
    case UserGraphTypes.U:
      return nodesPositionsU;
    case UserGraphTypes.UW:
      return nodesPositionsUW;
    case UserGraphTypes.D:
      return nodesPositionsD;
    case UserGraphTypes.DW:
      return nodesPositionsDW;
  }
}

export default getProperNodesPosition;
