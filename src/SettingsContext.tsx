import React, { useContext, useState } from "react";
import { AnyVisualisationData } from "./visualisationData/allVisualisationData";
import { getDefaultVisualisationData, getProperVisualisationData } from "./visualisationData/getProperDataFunctions";
import { UserGraphTypes } from "./visualisationData/graphDataSets/allGraphData";
import { SearchAlgorithmsTypes } from "./visualisationData/searchAlgorithms/allAlgorithmData";

interface VisualisationDataContextProps {
  visualisationData: AnyVisualisationData,
  updateVisualisationData: (graphType: UserGraphTypes, algorithmType: SearchAlgorithmsTypes) => void;
};

const VisualisationDataContext = React.createContext<VisualisationDataContextProps|null>(null);

export function useVisualisationData() {
  return useContext(VisualisationDataContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [ visualisationData, setVisualisationData ] = useState<AnyVisualisationData>(getDefaultVisualisationData());

  function updateVisualisationData(graphType: UserGraphTypes, algorithmType: SearchAlgorithmsTypes): void {
    console.log(`updateVisualisationData(${graphType}, ${algorithmType})`);
    setVisualisationData(
      getProperVisualisationData(graphType, algorithmType)
    );
  }

  return (
    <VisualisationDataContext.Provider value={{ visualisationData, updateVisualisationData }}>
      { children }
    </VisualisationDataContext.Provider>
  );
}