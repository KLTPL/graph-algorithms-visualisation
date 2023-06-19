import { useEffect, useState } from "react";
import { UserGraphTypes } from "../visualisationData/graphDataSets/allGraphData";
import Matrix from "./graphs/Matrix";
import Directed from "./graphs/Directed";
import DirectedWeighted from "./graphs/DirectedWeighted";
import Undirected from "./graphs/Undirected";
import UndirectedWeighted from "./graphs/UndirectedWeighted";
import { UserInputDataContextProps, VisualisationDataContextProps, useUserInputData, useVisualisationData } from "../SettingsContext";
import { AnyVisualisationData } from "../visualisationData/allVisualisationData";
import { getDefaultVisualisationData } from "../visualisationData/getProperDataFunctions";

function getDefaultGraphElemet(): JSX.Element {
  return getProperGraphElement(getDefaultVisualisationData());
}

function getProperGraphElement(visualisationData: AnyVisualisationData): JSX.Element {
  switch (visualisationData.graphType) {
    case UserGraphTypes.matrix: 
      return <Matrix />;
    case UserGraphTypes.directed: 
      return <Directed />;
    case UserGraphTypes.directedWeighted: 
      return <DirectedWeighted />;
    case UserGraphTypes.undirected: 
      return <Undirected />;
    case UserGraphTypes.undirectedWeighted: 
      return <UndirectedWeighted />;
  }
}

export default function GraphContainer() {
  const visualisationDataContext = useVisualisationData() as VisualisationDataContextProps;
  const UserInputDataContext = useUserInputData() as UserInputDataContextProps;
  const { visualisationData } = visualisationDataContext;
  const { currStepIdx, updateCurrStepIdx } = UserInputDataContext;

  function incrementCurrStepIdx() {
    const listOfStepsLen = visualisationData.listOfSteps.length;
    if (currStepIdx < listOfStepsLen - 1) {
      updateCurrStepIdx(currStepIdx + 1);
    }
  }

  function decrementCurrStepIdx() {
    if (currStepIdx >= 0) {
      updateCurrStepIdx(currStepIdx - 1);
    }
  }

  return (
    <div>
      { getProperGraphElement(visualisationData) }
      <div>
        <button onClick={decrementCurrStepIdx}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/></svg>
        </button>
        <button onClick={incrementCurrStepIdx}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/></svg>
        </button>
      </div>
      { currStepIdx }
    </div>
  );
}