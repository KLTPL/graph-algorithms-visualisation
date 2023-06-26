// Conversion of graphs from user to developer:
// matrix graph -> matrix graph
// edge directed graph, -> edge directed weighted graph (with cost = 1 on every connection)
// edge undrirected graph, -> edge directed weighted graph (with cost = 1 on every connection)
// edge directed weighted graph, -> edge directed weighted graph
// edge undirected weighted graph -> edge directed weighted graph

// Shortcuts for graph types:
// - M - matrix graph
// - D - directed graph
// - DW - directed weighted graph
// - U - undirected graph
// - UW - undirected weighted graph
// - E - edge graph (with edges) - not a matrix graph (including: D, DW, U, UW)

export enum UserGraphTypes {
  M,
  D,
  DW,
  U,
  UW,
}

export enum NodeTypesM {
  empty,
  rock,
}

export type FieldM = { x: number; y: number };
export type NodeE = string;
export type ToNodeDW = { node: NodeE; cost: number };
export type AnyNode = FieldM | NodeE;

export type GraphM = NodeTypesM[][];
export type GraphDW = Map<NodeE, ToNodeDW[]>;
export type AnyGraph = GraphM | GraphDW;

export interface GraphDataM {
  graph: GraphM;
  startNode: FieldM;
  endNode: FieldM;
  graphType: UserGraphTypes;
}
export interface GraphDataDW {
  graph: GraphDW;
  startNode: NodeE;
  endNode: NodeE;
  graphType: UserGraphTypes;
  isUOrUW: boolean;
  isDOrDW: boolean;
  isDWOrUW: boolean;
}

export type AnyGraphData = GraphDataM | GraphDataDW;
