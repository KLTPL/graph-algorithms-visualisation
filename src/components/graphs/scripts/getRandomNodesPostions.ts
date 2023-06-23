import { NodeEdgeGraph } from "../../../visualisationData/typesGraphData";

export type NodePostion = { left: number; top: number };
export type NodesPostions = NodePostion[];

function getRandomNodesPositions(nodesAmount: number): NodesPostions {
  return Array(nodesAmount)
    .fill(null)
    .map(() => {
      return {
        left: Math.floor(Math.random() * 100),
        top: Math.floor(Math.random() * 100),
      };
    });
}

export default getRandomNodesPositions;
