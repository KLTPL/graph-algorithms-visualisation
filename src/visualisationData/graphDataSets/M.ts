import {
  NodeTypesM,
  UserGraphTypes,
  GraphM,
  GraphDataM,
} from "../typesGraphData";

export const graphDataM: GraphDataM = {
  graph: getDefaultGraph(),
  startNode: { x: 2, y: 2 },
  endNode: { x: 0, y: 0 },
  graphType: UserGraphTypes.M,
};

function getDefaultGraph(): GraphM {
  const graph: GraphM = new Array(5)
    .fill(null)
    .map(() => Array(5).fill(NodeTypesM.empty));
  graph[0][1] = NodeTypesM.rock;
  graph[3][4] = NodeTypesM.rock;
  return graph;
}

export default graphDataM;
