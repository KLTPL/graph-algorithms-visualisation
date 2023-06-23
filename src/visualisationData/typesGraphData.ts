// Conversion of graphs from user to developer:
// matrix graph -> matrix graph
// edge directed graph, -> edge directed weighted graph (with cost = 1 on every connection)
// edge undrirected graph, -> edge directed weighted graph (with cost = 1 on every connection)
// edge directed weighted graph, -> edge directed weighted graph
// edge undirected weighted graph -> edge directed weighted graph

export enum UserGraphTypes {
  matrix,
  directed,
  directedWeighted,
  undirected,
  undirectedWeighted,
}

export enum NodeTypesMatrixGraph {
  empty,
  rock,
}

export type FieldMatrixGraph = { x: number; y: number };
export type NodeEdgeGraph = string;
export type ToNodeDirectedWeightedGraph = { node: NodeEdgeGraph; cost: number };
export type AnyNode = FieldMatrixGraph | NodeEdgeGraph;

export type MatrixGraph = NodeTypesMatrixGraph[][];
export type DirectedWeightedGraph = Map<
  NodeEdgeGraph,
  ToNodeDirectedWeightedGraph[]
>;
export type AnyGraph = MatrixGraph | DirectedWeightedGraph;

export interface GraphDataMatrix {
  graph: MatrixGraph;
  startNode: FieldMatrixGraph;
  endNode: FieldMatrixGraph;
  graphType: UserGraphTypes;
}
export interface GraphDataDirectedWeighted {
  graph: DirectedWeightedGraph;
  startNode: NodeEdgeGraph;
  endNode: NodeEdgeGraph;
  graphType: UserGraphTypes;
}

export type AnyGraphData = GraphDataMatrix | GraphDataDirectedWeighted;
