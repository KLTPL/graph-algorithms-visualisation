import { useEffect, useState } from "react";
import { UserGraphTypes } from "../visualisationData/graphDataSets/allGraphData";
import { SearchAlgorithmsTypes } from "../visualisationData/searchAlgorithms/allAlgorithmData";
import Matrix from "./graphs/Matrix";
import Directed from "./graphs/Directed";
import DirectedWeighted from "./graphs/DirectedWeighted";
import Undirected from "./graphs/Undirected";
import UndirectedWeighted from "./graphs/UndirectedWeighted";
import { VisualisationDataDirectedWeighted, VisualisationDataMatrix } from "../visualisationData/allVisualisationData";
import { getProperVisualisationData } from "../visualisationData/getProperDataFunctions";
import { useVisualisationData } from "../SettingsContext";

export type GraphComponentMatrixProps = { visualisationData: VisualisationDataMatrix };
export type GraphComponentDirectedWeightedProps = { visualisationData: VisualisationDataDirectedWeighted };

function getProperGraphElement(graphType: UserGraphTypes, searchAlgorithmType: SearchAlgorithmsTypes): JSX.Element {
  const visualisationData = getProperVisualisationData(graphType, searchAlgorithmType);

  const visualisationDataM = visualisationData as VisualisationDataMatrix;
  const visualisationDataDW = visualisationData as VisualisationDataDirectedWeighted;

  switch (graphType) {
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
  const visualisationDataContext = useVisualisationData();
  const [ graphElement, setGraphElement ] = useState<JSX.Element>(getProperGraphElement(UserGraphTypes.matrix, SearchAlgorithmsTypes.dfs));

  useEffect(() => {
    console.log("tak");
    if (visualisationDataContext !== null) {
      const graphType = visualisationDataContext.visualisationData.graphData.type;
      const algorithmType = visualisationDataContext.visualisationData.algorithmData.type;
      setGraphElement(
        getProperGraphElement(graphType, algorithmType)
      );
    }
  }, [ visualisationDataContext ]);

  return (
    <div>
      { graphElement }
      <div>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/></svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/></svg>
        </button>
      </div>
    </div>
  );
}