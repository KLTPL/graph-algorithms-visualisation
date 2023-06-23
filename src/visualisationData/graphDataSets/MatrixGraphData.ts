import {
  NodeTypesMatrixGraph,
  UserGraphTypes,
  MatrixGraph,
  GraphDataMatrix,
} from "../typesGraphData";

export const matrixGraphData: GraphDataMatrix = {
  graph: getDefaultGraph(),
  startNode: { x: 2, y: 2 },
  endNode: { x: 0, y: 0 },
  graphType: UserGraphTypes.matrix,
};

function getDefaultGraph(): MatrixGraph {
  const graph: MatrixGraph = new Array(5)
    .fill(null)
    .map(() => Array(5).fill(NodeTypesMatrixGraph.empty));
  graph[0][1] = NodeTypesMatrixGraph.rock;
  graph[3][4] = NodeTypesMatrixGraph.rock;
  return graph;
}

export default matrixGraphData;
