import { GraphDataDirectedWeighted, FieldMatrixGraph, GraphDataMatrix, NodeEdgeGraph } from "./typesGraphData";

export enum SearchAlgorithmsTypes {
  dfs, bfs
}

export interface SearchExecutionDataMatrixGraph {
  algorithmType: SearchAlgorithmsTypes,
  listOfSteps: FieldMatrixGraph[];
  isEndNodeReached: boolean;
  pathToEndNode: FieldMatrixGraph[]|null;
  pathCost: number;
}
export interface SearchExecutionDataDirectedWeightedGraph {
  algorithmType: SearchAlgorithmsTypes,
  listOfSteps: NodeEdgeGraph[];
  isEndNodeReached: boolean;
  pathToEndNode: NodeEdgeGraph[]|null;
  pathCost: number;
}

export type AnySearchExecutionData = SearchExecutionDataMatrixGraph | SearchExecutionDataDirectedWeightedGraph;

export type VisitedNodesStartNode = true;
// true - startNode null - not visited or startNode; FieldMatrixGraph - field was visited from
export type VisitedNodesMatrixGraph = (VisitedNodesStartNode|null|FieldMatrixGraph)[][]; 
// from node to: null - not visited or NodeEdgeGraph - node was visited from
export type VisitedNodesEdgeDirectedWieghtedGraph = Map<NodeEdgeGraph, VisitedNodesStartNode|null|NodeEdgeGraph>;
export type AnyVisitedNodes = VisitedNodesMatrixGraph | VisitedNodesEdgeDirectedWieghtedGraph;

export type SearchAlgorithmFunMatrix = (graphData: GraphDataMatrix) => SearchExecutionDataMatrixGraph;
export type SearchAlgorithmFunDirectedWeighted = (graphData: GraphDataDirectedWeighted) => SearchExecutionDataDirectedWeightedGraph;
export type AnySearchAlgorithmFun = SearchAlgorithmFunMatrix | SearchAlgorithmFunDirectedWeighted;

export interface SearchAlgorithmsFunsMatrix {
  dfs: SearchAlgorithmFunMatrix,
  bfs: SearchAlgorithmFunMatrix,
}
export interface SearchAlgorithmsFunsDirectedWeighted {
  dfs: SearchAlgorithmFunDirectedWeighted,
  bfs: SearchAlgorithmFunDirectedWeighted,
}