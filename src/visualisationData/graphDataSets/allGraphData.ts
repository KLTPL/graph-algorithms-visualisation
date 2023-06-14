import { SearchAlgorithmFunDirectedWeighted } from "../searchAlgorithms/allAlgorithmData";
import { AnySearchAlgorithmFun } from "../searchAlgorithms/allAlgorithmData";
import { SearchAlgorithmFunMatrix } from "../searchAlgorithms/allAlgorithmData";

// Conversion of graphs from user to developer:
// matrix graph -> matrix graph
// edge directed graph, -> edge directed weighted graph (with cost = 1 on every connection)
// edge undrirected graph, -> edge directed weighted graph (with cost = 1 on every connection)
// edge directed weighted graph, -> edge directed weighted graph
// edge undirected weighted graph -> edge directed weighted graph

export enum UserGraphTypes {
  matrix, directed, directedWeighted, undirected, undirectedWeighted
}

export enum FieldTypesMatrixGraph {
  empty, rock
}

export type FieldMatrixGraph = { x: number, y: number };
export type NodeEdgeGraph = string;
export type ToNodeDirectedWeightedGraph = { node: NodeEdgeGraph, cost: number };
export type AnyNode = FieldMatrixGraph | NodeEdgeGraph;

export type MatrixGraph = FieldTypesMatrixGraph[][];
export type DirectedWeightedGraph = Map<NodeEdgeGraph, ToNodeDirectedWeightedGraph[]>;
export type AnyGraph = MatrixGraph | DirectedWeightedGraph;

interface GraphDataParent {
  graph: AnyGraph,
  startNode: AnyNode,
  endNode: AnyNode,
  type: UserGraphTypes,
};
export interface GraphDataMatrix extends GraphDataParent {
  graph: MatrixGraph;
  startNode: FieldMatrixGraph;
  endNode: FieldMatrixGraph;
  type: UserGraphTypes;
};
export interface GraphDataDirectedWeighted extends GraphDataParent {
  graph: DirectedWeightedGraph;
  startNode: NodeEdgeGraph;
  endNode: NodeEdgeGraph;
  type: UserGraphTypes;
};

export type AnyGraphData = GraphDataMatrix|GraphDataDirectedWeighted;