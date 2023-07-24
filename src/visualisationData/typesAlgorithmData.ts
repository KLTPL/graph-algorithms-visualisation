import { GraphDataDW, FieldM, GraphDataM, NodeE } from "./typesGraphData";

export enum SearchAlgorithmsTypes {
  Dfs,
  Bfs,
  Dijkstras,
}

export type StepDW = { from: NodeE; to: NodeE };

export interface SearchExecutionDataM {
  algorithmType: SearchAlgorithmsTypes;
  listOfSteps: FieldM[];
  isEndNodeReached: boolean;
  pathToEndNode: FieldM[] | null;
  pathCost: number;
}
export interface SearchExecutionDataDW {
  algorithmType: SearchAlgorithmsTypes;
  listOfSteps: StepDW[];
  isEndNodeReached: boolean;
  pathToEndNode: NodeE[] | null;
  pathCost: number;
}

export type AnySearchExecutionData =
  | SearchExecutionDataM
  | SearchExecutionDataDW;

export type VisitedNodesStartNode = true;

export type SearchAlgorithmFunM = (
  graphData: GraphDataM
) => SearchExecutionDataM;
export type SearchAlgorithmFunDW = (
  graphData: GraphDataDW
) => SearchExecutionDataDW;
export type AnySearchAlgorithmFun = SearchAlgorithmFunM | SearchAlgorithmFunDW;
