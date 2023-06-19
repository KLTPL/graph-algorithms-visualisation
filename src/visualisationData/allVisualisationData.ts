import { GraphAndAlgorithmDataDirectedWeighted, GraphAndAlgorithmDataMatrix } from "./allGraphAndAlgorithmData";

export interface VisualisationDataMatrix {
  graphAndAlgorithm: GraphAndAlgorithmDataMatrix;
  currStepIdx: number;
}

export interface VisualisationDataDirectedWeighted {
  graphAndAlgorithm: GraphAndAlgorithmDataDirectedWeighted;
  currStepIdx: number;
}

export type AnyVisualisationData = VisualisationDataMatrix | VisualisationDataDirectedWeighted;