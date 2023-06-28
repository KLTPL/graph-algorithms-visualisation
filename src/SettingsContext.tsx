import React, { useContext, useState } from "react";
import {
  getDefaultVisualisationData,
  getProperVisualisationData,
} from "./visualisationData/getProperDataFunctions";
import { UserGraphTypes } from "./visualisationData/typesGraphData";
import { SearchAlgorithmsTypes } from "./visualisationData/typesAlgorithmData";
import { AnyVisualisationData } from "./visualisationData/typesVisualisationData";
import {
  AnyVisualisationPointerTool,
  VisualisationPointerToolsM,
} from "./components/VisualisationTools";

const DEFAULT_CURR_STEP_IDX = -1;

export interface VisualisationDataContextProps {
  visualisationData: AnyVisualisationData;
  switchVisualisationData: (
    graphType: UserGraphTypes,
    algorithmType: SearchAlgorithmsTypes
  ) => void;
  refreshVisualisationData: () => void;
}

export interface UserInputDataContextProps {
  currStepIdx: number;
  updateCurrStepIdx: (newIdx: number) => void;
}

export interface VisualisationPointerToolsContextProps {
  pointerTool: AnyVisualisationPointerTool;
  updatePointerTool: (newTool: AnyVisualisationPointerTool) => void;
}

const VisualisationDataContext =
  React.createContext<VisualisationDataContextProps>(
    null as unknown as VisualisationDataContextProps
  );
const UserInputDataContext = React.createContext<UserInputDataContextProps>(
  null as unknown as UserInputDataContextProps
);
const VisualisationPointerToolsContext =
  React.createContext<VisualisationPointerToolsContextProps>(
    null as unknown as VisualisationPointerToolsContextProps
  );

export function useVisualisationData() {
  return useContext(VisualisationDataContext);
}

export function useUserInputData() {
  return useContext(UserInputDataContext);
}

export function useVisualisationPointerTools() {
  return useContext(VisualisationPointerToolsContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [visualisationData, setVisualisationData] =
    useState<AnyVisualisationData>(getDefaultVisualisationData());
  const [currStepIdx, setCurrStepIdx] = useState<number>(DEFAULT_CURR_STEP_IDX);
  const [pointerTool, setPointerTool] = useState<AnyVisualisationPointerTool>(
    VisualisationPointerToolsM.EmptyField
  );

  function switchVisualisationData(
    graphType: UserGraphTypes,
    algorithmType: SearchAlgorithmsTypes
  ): void {
    const newVisualisationData = getProperVisualisationData(
      graphType,
      algorithmType
    );
    setVisualisationData(newVisualisationData);
    updateCurrStepIdx(DEFAULT_CURR_STEP_IDX);
  }
  function refreshVisualisationData(): void {
    const { graphType, algorithmType } = visualisationData;
    switchVisualisationData(graphType, algorithmType);
  }
  function updateCurrStepIdx(newIdx: number): void {
    setCurrStepIdx(newIdx);
  }
  function updatePointerTool(newTool: number): void {
    setPointerTool(newTool);
  }

  return (
    <VisualisationDataContext.Provider
      value={{
        visualisationData,
        switchVisualisationData,
        refreshVisualisationData,
      }}
    >
      <UserInputDataContext.Provider value={{ currStepIdx, updateCurrStepIdx }}>
        <VisualisationPointerToolsContext.Provider
          value={{ pointerTool, updatePointerTool }}
        >
          {children}
        </VisualisationPointerToolsContext.Provider>
      </UserInputDataContext.Provider>
    </VisualisationDataContext.Provider>
  );
}
