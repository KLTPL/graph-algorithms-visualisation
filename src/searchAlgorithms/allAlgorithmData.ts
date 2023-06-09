import { DirectedWeightedGraphData, FieldMatrixGraph, MatrixGraphData, NodeEdgeGraph } from "../graphDataSets/allGraphData";

export enum SearchAlgorithmsTypes {
  dfs, bfs
}

export interface SearchExecutionDataMatrixGraph {
  listOfSteps: FieldMatrixGraph[];
  isEndNodeReached: boolean;
  pathToEndNode: FieldMatrixGraph[]|null;
  pathCost: number,
}
export interface SearchExecutionDataEdgeGraph {
  listOfSteps: NodeEdgeGraph[];
  isEndNodeReached: boolean;
  pathToEndNode: NodeEdgeGraph[]|null;
  pathCost: number,
}

export type AnySearchExecutionData = SearchExecutionDataMatrixGraph | SearchExecutionDataEdgeGraph;

export type VisitedNodesStartNode = true;
// true - startNode null - not visited or startNode; FieldMatrixGraph - field was visited from
export type VisitedNodesMatrixGraph = (VisitedNodesStartNode|null|FieldMatrixGraph)[][]; 
// from node to: null - not visited or NodeEdgeGraph - node was visited from
export type VisitedNodesEdgeDirectedWieghtedGraph = Map<NodeEdgeGraph, VisitedNodesStartNode|null|NodeEdgeGraph>;
export type AnyVisitedNodes = VisitedNodesMatrixGraph | VisitedNodesEdgeDirectedWieghtedGraph;

export type SearchAlgorithmFunMatrixGraph = (graphData: MatrixGraphData, data: SearchExecutionDataMatrixGraph) => void;
export type SearchAlgorithmFunDirectedWeightedGraph = (graphData: DirectedWeightedGraphData, data: SearchExecutionDataEdgeGraph) => void;
export type AnySearchAlgorithmFun = SearchAlgorithmFunMatrixGraph | SearchAlgorithmFunDirectedWeightedGraph;