import { GraphDataDirectedWeighted, GraphDataMatrix } from "./graphDataSets/allGraphData";
import { SearchExecutionDataDirectedWeightedGraph, SearchExecutionDataMatrixGraph } from "./searchAlgorithms/allAlgorithmData";

export interface GraphAndAlgorithmDataMatrix {
  graphData: GraphDataMatrix;
  algorithmData: SearchExecutionDataMatrixGraph;
}

export interface GraphAndAlgorithmDataDirectedWeighted {
  graphData: GraphDataDirectedWeighted;
  algorithmData: SearchExecutionDataDirectedWeightedGraph;
}

export type AnyGraphAndAlgorithmData = GraphAndAlgorithmDataMatrix | GraphAndAlgorithmDataDirectedWeighted;