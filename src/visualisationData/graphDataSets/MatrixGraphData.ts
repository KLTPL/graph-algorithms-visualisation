import { FieldTypesMatrixGraph, UserGraphTypes, MatrixGraph, GraphDataMatrix } from "./allGraphData";

export const matrixGraphData: GraphDataMatrix = {
  graph: getDefaultGraph(),
  startNode: { x: 2, y: 2 },
  endNode: { x: 0, y: 0 },
  type: UserGraphTypes.matrix,
};

function getDefaultGraph(): MatrixGraph {
  const graph: MatrixGraph = new Array(5).fill(null).map(() => Array(5).fill(FieldTypesMatrixGraph.empty));
  return graph;
}

export default matrixGraphData;