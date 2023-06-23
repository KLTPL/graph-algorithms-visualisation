import { GraphDataDW, GraphDataM } from "./typesGraphData";
import {
  SearchExecutionDataDW,
  SearchExecutionDataM,
} from "./typesAlgorithmData";

export interface VisualisationDataM extends GraphDataM, SearchExecutionDataM {}

export interface VisualisationDataDW
  extends GraphDataDW,
    SearchExecutionDataDW {}

export type AnyVisualisationData = VisualisationDataM | VisualisationDataDW;
