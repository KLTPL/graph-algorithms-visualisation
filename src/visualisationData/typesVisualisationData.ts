import { GraphDataDirectedWeighted, GraphDataMatrix } from "./typesGraphData";
import { SearchExecutionDataDirectedWeightedGraph, SearchExecutionDataMatrixGraph } from "./typesAlgorithmData";

export interface VisualisationDataMatrix extends GraphDataMatrix, SearchExecutionDataMatrixGraph {
}

export interface VisualisationDataDirectedWeighted extends GraphDataDirectedWeighted, SearchExecutionDataDirectedWeightedGraph {
}

export type AnyVisualisationData = VisualisationDataMatrix | VisualisationDataDirectedWeighted;