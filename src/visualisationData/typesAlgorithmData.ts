import { GraphDataDW, FieldM, GraphDataM, NodeE } from "./typesGraphData";

export enum SearchAlgorithmsTypes {
  Dfs,
  Bfs,
}

export interface SearchExecutionDataM {
  algorithmType: SearchAlgorithmsTypes;
  listOfSteps: FieldM[];
  isEndNodeReached: boolean;
  pathToEndNode: FieldM[] | null;
  pathCost: number;
}
export interface SearchExecutionDataDW {
  algorithmType: SearchAlgorithmsTypes;
  listOfSteps: NodeE[];
  isEndNodeReached: boolean;
  pathToEndNode: NodeE[] | null;
  pathCost: number;
}

export type AnySearchExecutionData =
  | SearchExecutionDataM
  | SearchExecutionDataDW;

export type VisitedNodesStartNode = true;
// true - startNode null - not visited or startNode; FieldMatrixGraph - field was visited from
export type VisitedNodesM = (VisitedNodesStartNode | null | FieldM)[][];
// from node to: null - not visited or NodeEdgeGraph - node was visited from
export type VisitedNodesDW = Map<NodeE, VisitedNodesStartNode | null | NodeE>;
export type AnyVisitedNodes = VisitedNodesM | VisitedNodesDW;

export type SearchAlgorithmFunM = (
  graphData: GraphDataM
) => SearchExecutionDataM;
export type SearchAlgorithmFunDW = (
  graphData: GraphDataDW
) => SearchExecutionDataDW;
export type AnySearchAlgorithmFun = SearchAlgorithmFunM | SearchAlgorithmFunDW;

export interface SearchAlgorithmsFunsM {
  dfs: SearchAlgorithmFunM;
  bfs: SearchAlgorithmFunM;
}
export interface SearchAlgorithmsFunsDW {
  dfs: SearchAlgorithmFunDW;
  bfs: SearchAlgorithmFunDW;
}
