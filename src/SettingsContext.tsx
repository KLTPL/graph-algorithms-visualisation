import React, { useContext, useState } from "react";
import { getDefaultVisualisationData, getProperVisualisationData } from "./visualisationData/getProperDataFunctions";
import { UserGraphTypes } from "./visualisationData/graphDataSets/allGraphData";
import { SearchAlgorithmsTypes } from "./visualisationData/searchAlgorithms/allAlgorithmData";
import { AnyVisualisationData } from "./visualisationData/allVisualisationData";

const DEFAULT_CURR_STEP_IDX = -1;

export interface VisualisationDataContextProps {
  visualisationData: AnyVisualisationData,
  switchVisualisationData: (graphType: UserGraphTypes, algorithmType: SearchAlgorithmsTypes) => void;
};

export interface UserInputDataContextProps {
  currStepIdx: number,
  updateCurrStepIdx: (newIdx: number) => void;
}

const VisualisationDataContext = React.createContext<VisualisationDataContextProps|null>(null);
const UserInputDataContext = React.createContext<UserInputDataContextProps|null>(null);

export function useVisualisationData() {
  return useContext(VisualisationDataContext);
}

export function useUserInputData() {
  return useContext(UserInputDataContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [ visualisationData, setVisualisationData ] = useState<AnyVisualisationData>(getDefaultVisualisationData());
  const [ currStepIdx, setCurrStepIdx ] = useState<number>(DEFAULT_CURR_STEP_IDX);

  function switchVisualisationData(graphType: UserGraphTypes, algorithmType: SearchAlgorithmsTypes): void {
    console.log(`switching visualisation data graphType = ${graphType}, algorithmType = ${algorithmType}`);
    const newVisualisationData = getProperVisualisationData(graphType, algorithmType);
    setVisualisationData(newVisualisationData);
    updateCurrStepIdx(DEFAULT_CURR_STEP_IDX);
  }
  function updateCurrStepIdx(newIdx: number) {
    setCurrStepIdx(newIdx);
  }

  return (
    <VisualisationDataContext.Provider value={{ visualisationData, switchVisualisationData: switchVisualisationData }}>
      <UserInputDataContext.Provider value={{ currStepIdx, updateCurrStepIdx }}>
        { children }
      </UserInputDataContext.Provider>
    </VisualisationDataContext.Provider>
  );
}