import { useEffect, useState } from "react";
import { UserGraphTypes } from "../visualisationData/graphDataSets/allGraphData";
import Matrix from "./graphs/Matrix";
import Directed from "./graphs/Directed";
import DirectedWeighted from "./graphs/DirectedWeighted";
import Undirected from "./graphs/Undirected";
import UndirectedWeighted from "./graphs/UndirectedWeighted";
import { VisualisationDataContextProps, useVisualisationData } from "../SettingsContext";
import { VisualisationDataDirectedWeighted, VisualisationDataMatrix } from "../visualisationData/allVisualisationData";
import { AnyGraphAndAlgorithmData } from "../visualisationData/allGraphAndAlgorithmData";

export type GraphComponentMatrixProps = { visualisationData: VisualisationDataMatrix };
export type GraphComponentDirectedWeightedProps = { visualisationData: VisualisationDataDirectedWeighted };

function getProperGraphElement(graphAndAlgorithm: AnyGraphAndAlgorithmData, currStepIdx: number): JSX.Element {
  const visualisationData = { graphAndAlgorithm, currStepIdx };

  const visualisationDataM = visualisationData as VisualisationDataMatrix;
  const visualisationDataDW = visualisationData as VisualisationDataDirectedWeighted;

  switch (graphAndAlgorithm.graphData.type) {
    case UserGraphTypes.matrix: 
      return <Matrix visualisationData={visualisationDataM} />;
    case UserGraphTypes.directed: 
      return <Directed visualisationData={visualisationDataDW} />;
    case UserGraphTypes.directedWeighted: 
      return <DirectedWeighted visualisationData={visualisationDataDW} />;
    case UserGraphTypes.undirected: 
      return <Undirected visualisationData={visualisationDataDW} />;
    case UserGraphTypes.undirectedWeighted: 
      return <UndirectedWeighted visualisationData={visualisationDataDW} />;
  }
}

export default function GraphContainer() {
  const visualisationDataContext = useVisualisationData() as VisualisationDataContextProps;
  const { graphAndAlgorithm, currStepIdx } = visualisationDataContext;
  const [ graphElement, setGraphElement ] = useState<JSX.Element>(getProperGraphElement(graphAndAlgorithm, currStepIdx));

  useEffect(() => {
    if (visualisationDataContext !== null) {
      setGraphElement(
        getProperGraphElement(graphAndAlgorithm, currStepIdx)
      );
    }
  }, [ visualisationDataContext ]);


  function incrementCurrStepIdx() {
    if (visualisationDataContext === null) {
      throw new Error("Viusalisation data context is null");
    }
    const listOfSteps = visualisationDataContext.graphAndAlgorithm.algorithmData.listOfSteps;
    const currIdx = visualisationDataContext.currStepIdx;

    if (currIdx < listOfSteps.length - 1) {
      visualisationDataContext.updateCurrStepIdx(currIdx + 1);
    }
  }

  function decrementCurrStepIdx() {
    if (visualisationDataContext === null) {
      throw new Error("Viusalisation data context is null");
    }
    const currIdx = visualisationDataContext.currStepIdx;

    if (currIdx >= 0) {
      visualisationDataContext.updateCurrStepIdx(currIdx - 1);
    }
  }

  return (
    <div>
      { graphElement }
      <div>
        <button onClick={decrementCurrStepIdx}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/></svg>
        </button>
        <button onClick={incrementCurrStepIdx}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/></svg>
        </button>
      </div>
      { visualisationDataContext?.currStepIdx }
    </div>
  );
}