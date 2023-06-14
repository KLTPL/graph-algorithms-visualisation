import { GraphDataDirectedWeighted, GraphDataMatrix } from "./graphDataSets/allGraphData";
import { SearchExecutionDataDirectedWeightedGraph, SearchExecutionDataMatrixGraph } from "./searchAlgorithms/allAlgorithmData";

export interface VisualisationDataMatrix {
  graphData: GraphDataMatrix;
  algorithmData: SearchExecutionDataMatrixGraph;
}

export interface VisualisationDataDirectedWeighted {
  graphData: GraphDataDirectedWeighted;
  algorithmData: SearchExecutionDataDirectedWeightedGraph;
}

export type AnyVisualisationData = VisualisationDataMatrix | VisualisationDataDirectedWeighted;