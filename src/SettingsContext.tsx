import React, { useContext, useState } from "react";
import { getDefaultVisualisationData, getProperVisualisationData } from "./visualisationData/getProperDataFunctions";
import { UserGraphTypes } from "./visualisationData/typesGraphData";
import { SearchAlgorithmsTypes } from "./visualisationData/typesAlgorithmData";
import { AnyVisualisationData } from "./visualisationData/typesVisualisationData";

const DEFAULT_CURR_STEP_IDX = -1;

export interface VisualisationDataContextProps {
  visualisationData: AnyVisualisationData,
  switchVisualisationData: (graphType: UserGraphTypes, algorithmType: SearchAlgorithmsTypes) => void;
};

export interface UserInputDataContextProps {
  currStepIdx: number,
  updateCurrStepIdx: (newIdx: number) => void;
}

const VisualisationDataContext = React.createContext<VisualisationDataContextProps>((null as unknown) as VisualisationDataContextProps);
const UserInputDataContext = React.createContext<UserInputDataContextProps>((null as unknown) as UserInputDataContextProps);

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