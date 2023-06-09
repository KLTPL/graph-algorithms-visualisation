import { bfs, dfs } from "../searchAlgorithms/matrixGraphAlgorithms";
import { FieldTypesMatrixGraph, UserGraphTypes, MatrixGraph, MatrixGraphData } from "./allGraphData";

const matrixGraphData: MatrixGraphData = {
  graph: getDefaultGraph(),
  startNode: { x: 2, y: 2 },
  endNode: { x: 0, y: 0 },
  type: UserGraphTypes.matrix,
  dfs: dfs,
  bfs: bfs,
};

function getDefaultGraph(): MatrixGraph {
  const graph: MatrixGraph = new Array(5).fill(null).map(() => Array(5).fill(FieldTypesMatrixGraph.empty));
  return graph;
}

export default matrixGraphData;