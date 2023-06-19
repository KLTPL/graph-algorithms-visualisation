import { GraphDataDirectedWeighted, GraphDataMatrix } from "./graphDataSets/allGraphData";
import { SearchExecutionDataDirectedWeightedGraph, SearchExecutionDataMatrixGraph } from "./searchAlgorithms/allAlgorithmData";

export interface VisualisationDataMatrix extends GraphDataMatrix, SearchExecutionDataMatrixGraph {
}

export interface VisualisationDataDirectedWeighted extends GraphDataDirectedWeighted, SearchExecutionDataDirectedWeightedGraph {
}

export type AnyVisualisationData = VisualisationDataMatrix | VisualisationDataDirectedWeighted;