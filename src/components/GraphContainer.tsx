import { useEffect, useState } from "react";
import { useGraphType, useListOfStepsIdx, useSearchAlgorithmType } from "../SettingsContext";
import { DirectedWeightedGraphData, MatrixGraphData, UserGraphTypes } from "../graphDataSets/allGraphData";
import { AnySearchExecutionData, SearchAlgorithmsTypes, SearchExecutionDataDirectedWeightedGraph, SearchExecutionDataMatrixGraph } from "../searchAlgorithms/allAlgorithmData";
import { executeProperGraphAlgorithm, getProperGraphData } from "../graphDataSets/graphDataHelperFunctions";
import Matrix from "./graphs/Matrix";
import Directed from "./graphs/Directed";
import DirectedWeighted from "./graphs/DirectedWeighted";
import Undirected from "./graphs/Undirected";
import UndirectedWeighted from "./graphs/UndirectedWeighted";

export type GraphComponentMatrixProps = { graphData: MatrixGraphData, data: SearchExecutionDataMatrixGraph };
export type GraphComponentDirectedWeightedProps = { graphData: DirectedWeightedGraphData, data: SearchExecutionDataDirectedWeightedGraph };

function getProperGraphElement(graphType: UserGraphTypes, searchAlgorithmType: SearchAlgorithmsTypes): JSX.Element {
  const graphData = getProperGraphData(graphType);
  const data = getEmptySearchData();
  executeProperGraphAlgorithm(graphData, data, searchAlgorithmType);

  const graphDataM = graphData as MatrixGraphData;
  const dataM = data as SearchExecutionDataMatrixGraph;
  const graphDataDW = graphData as DirectedWeightedGraphData;
  const dataDW = data as SearchExecutionDataDirectedWeightedGraph;

  switch (graphData.type) {
    case UserGraphTypes.matrix: 
      return <Matrix graphData={graphDataM} data={dataM} />;
    case UserGraphTypes.directed: 
      return <Directed graphData={graphDataDW} data={dataDW} />;
    case UserGraphTypes.directedWeighted: 
      return <DirectedWeighted graphData={graphDataDW} data={dataDW} />;
    case UserGraphTypes.undirected: 
      return <Undirected graphData={graphDataDW} data={dataDW} />;
    case UserGraphTypes.undirectedWeighted: 
      return <UndirectedWeighted graphData={graphDataDW} data={dataDW} />;
  }
}

const getEmptySearchData = (): AnySearchExecutionData => {
  return {
    listOfSteps: [],
    pathCost: Infinity,
    pathToEndNode: null,
    isEndNodeReached: false,
  };
}

export default function GraphContainer() {
  const graphTypeObj = useGraphType();
  const searchTypeObj = useSearchAlgorithmType();
  const listOfSteps = useListOfStepsIdx();
  const [ graphElement, setGraphElement ] = useState<JSX.Element>(getProperGraphElement(UserGraphTypes.matrix, SearchAlgorithmsTypes.dfs));

  useEffect(() => {
    if (graphTypeObj !== null && searchTypeObj !== null) {
      setGraphElement(
        getProperGraphElement(graphTypeObj?.type, searchTypeObj?.type)
      );
    }
  }, [ graphTypeObj?.type, searchTypeObj?.type ]);

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