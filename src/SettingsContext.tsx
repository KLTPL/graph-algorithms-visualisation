import React, { useContext, useState } from "react";
import { AnyGraphAndAlgorithmData } from "./visualisationData/allGraphAndAlgorithmData";
import { getDefaultVisualisationData, getProperVisualisationData } from "./visualisationData/getProperDataFunctions";
import { UserGraphTypes } from "./visualisationData/graphDataSets/allGraphData";
import { SearchAlgorithmsTypes } from "./visualisationData/searchAlgorithms/allAlgorithmData";

interface VisualisationDataContextProps {
  graphAndAlgorithm: AnyGraphAndAlgorithmData,
  currStepIdx: number,
  updateGraphAndAlgorithm: (graphType: UserGraphTypes, algorithmType: SearchAlgorithmsTypes) => void;
  updateCurrStepIdx: (newIdx: number) => void;
};

const VisualisationDataContext = React.createContext<VisualisationDataContextProps|null>(null);

export function useVisualisationData() {
  return useContext(VisualisationDataContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const visualisationData = getDefaultVisualisationData();
  const [ graphAndAlgorithm, setGraphAndAlgorithm ] = useState<AnyGraphAndAlgorithmData>(visualisationData.graphAndAlgorithm);
  const [ currStepIdx, setCurrStepIdx ] = useState(visualisationData.currStepIdx);

  function updateGraphAndAlgorithm(graphType: UserGraphTypes, algorithmType: SearchAlgorithmsTypes): void {
    setGraphAndAlgorithm(
      getProperVisualisationData(graphType, algorithmType).graphAndAlgorithm
    );
  }
  function updateCurrStepIdx(newIdx: number) {
    setCurrStepIdx(newIdx);
  }

  return (
    <VisualisationDataContext.Provider value={{ graphAndAlgorithm, currStepIdx, updateGraphAndAlgorithm, updateCurrStepIdx }}>
      { children }
    </VisualisationDataContext.Provider>
  );
}