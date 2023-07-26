import React, { useContext, useState } from "react";
import {
  getDefaultVisualisationData,
  getProperVisualisationData,
} from "../visualisationData/getProperDataFunctions";
import {
  UserGraphTypes,
} from "../visualisationData/typesGraphData";
import { SearchAlgorithmsTypes } from "../visualisationData/typesAlgorithmData";
import { AnyVisualisationData } from "../visualisationData/typesVisualisationData";
import { VisualisationPointerTools } from "../components/visualisation-tools/VisualisationTools";

const DEFAULT_CURR_STEP_IDX = -1;

export interface VisualisationDataContextProps {
  visualisationData: AnyVisualisationData;
  switchVisualisationData: (
    graphType: UserGraphTypes,
    algorithmType: SearchAlgorithmsTypes
  ) => void;
  refreshVisualisationData: () => void;
}

export interface UserInputContextProps {
  currStepIdx: number;
  updateCurrStepIdx: (newIdx: number) => void;
  resetCurrStepIdx: () => void;
  isNodeDistsShow: boolean;
  toggleIsNodeDistsShow: () => void;
}

export interface VisualisationPointerToolsContextProps {
  pointerTool: VisualisationPointerTools;
  updatePointerTool: (newTool: VisualisationPointerTools) => void;
  setPointerToolToDefault: () => void;
}

const VisualisationDataContext =
  React.createContext<VisualisationDataContextProps>(
    null as unknown as VisualisationDataContextProps
  );
const UserInputContext = React.createContext<UserInputContextProps>(
  null as unknown as UserInputContextProps
);
const VisualisationPointerToolsContext =
  React.createContext<VisualisationPointerToolsContextProps>(
    null as unknown as VisualisationPointerToolsContextProps
  );

export function useVisualisationData() {
  return useContext(VisualisationDataContext);
}

export function useUserInput() {
  return useContext(UserInputContext);
}

export function useVisualisationPointerTools() {
  return useContext(VisualisationPointerToolsContext);
}

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [visualisationData, setVisualisationData] =
    useState<AnyVisualisationData>(getDefaultVisualisationData());
  const [currStepIdx, setCurrStepIdx] = useState<number>(DEFAULT_CURR_STEP_IDX);
  const [pointerTool, setPointerTool] = useState<VisualisationPointerTools>(
    VisualisationPointerTools.NoTool
  );
  const [isNodeDistsShow, setIsNodeDistsShow] = useState(false);

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
    if (
      (newVisualisationData.graphType !== UserGraphTypes.M &&
        visualisationData.graphType === UserGraphTypes.M) ||
      (newVisualisationData.graphType === UserGraphTypes.M &&
        visualisationData.graphType !== UserGraphTypes.M)
    ) {
      setPointerToolToDefault();
    }
  }
  function refreshVisualisationData(): void {
    const { graphType, algorithmType } = visualisationData;
    switchVisualisationData(graphType, algorithmType);
  }
  function updateCurrStepIdx(newIdx: number): void {
    setCurrStepIdx(newIdx);
  }
  function resetCurrStepIdx() {
    setCurrStepIdx(DEFAULT_CURR_STEP_IDX);
  }
  function updatePointerTool(newTool: number): void {
    setPointerTool(newTool);
  }
  function setPointerToolToDefault(): void {
    updatePointerTool(VisualisationPointerTools.NoTool);
  }
  function toggleIsNodeDistsShow(): void {
    setIsNodeDistsShow(prev => !prev);
  }

  return (
    <VisualisationDataContext.Provider
      value={{
        visualisationData,
        switchVisualisationData,
        refreshVisualisationData,
      }}
    >
      <UserInputContext.Provider
        value={{ currStepIdx, updateCurrStepIdx, resetCurrStepIdx, isNodeDistsShow, toggleIsNodeDistsShow }}
      >
        <VisualisationPointerToolsContext.Provider
          value={{ pointerTool, updatePointerTool, setPointerToolToDefault }}
        >
          {children}
        </VisualisationPointerToolsContext.Provider>
      </UserInputContext.Provider>
    </VisualisationDataContext.Provider>
  );
}
