import { useEffect, useState } from "react";
import { useGraphType, useSearchAlgorithmType } from "../SettingsContext";
import { AnyGraphData, UserGraphTypes } from "../graphDataSets/allGraphData";
import { SearchExecutionDataMatrixGraph } from "../searchAlgorithms/allAlgorithmData";
import { executeProperGraphAlgorithm, getProperGraphData } from "../graphDataSets/graphDataHelperFunctions";
import Matrix from "./graphs/Matrix";
import Directed from "./graphs/Directed";
import DirectedWeighted from "./graphs/DirectedWeighted";
import Undirected from "./graphs/Undirected";
import UndirectedWeighted from "./graphs/UndirectedWeighted";

function getProperGraphComponent(graphData: AnyGraphData): JSX.Element {
  console.log(graphData.type);
  switch (graphData.type) {
    case UserGraphTypes.matrix: return <Matrix />;
    case UserGraphTypes.directed: return <Directed />;
    case UserGraphTypes.directedWeighted: return <DirectedWeighted />;
    case UserGraphTypes.undirected: return <Undirected />;
    case UserGraphTypes.undirectedWeighted: return <UndirectedWeighted />;
  }
}

export default function GraphContainer() {
  const graphTypeObj = useGraphType();
  const sortTypeObj = useSearchAlgorithmType();
  const [graphData, setGraphData] = useState<AnyGraphData>(getProperGraphData(UserGraphTypes.matrix));


  useEffect(() => {
    console.log("graph type", graphData.type);
    if (graphTypeObj !== null) {
      setGraphData(getProperGraphData(graphTypeObj.type));
    }
  }, [graphTypeObj?.type]);

  function startExploringGraph() {
    if (graphTypeObj === null || sortTypeObj === null) {
      throw new Error("graphTypeObj or sortTypeObj is null");
    }
    const data: SearchExecutionDataMatrixGraph = {
      listOfSteps: [],
      pathCost: Infinity,
      pathToEndNode: null,
      isEndNodeReached: false,
    };

    executeProperGraphAlgorithm(graphData, data, sortTypeObj.type);
    console.log(data);
  }


  return (
    <div className="">
      <button onClick={startExploringGraph}>start exploring</button>
      { getProperGraphComponent(graphData) }
    </div>
  );
}