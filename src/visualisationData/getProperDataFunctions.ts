import directedGraphData from "./graphDataSets/DirectedGraphData";
import directedWeightedGraphData from "./graphDataSets/DirectedWeightedGraphData";
import matrixGraphData from "./graphDataSets/MatrixGraphData";
import undirectedGraphData from "./graphDataSets/UndirectedGraphData";
import undirectedWeightedGraphData from "./graphDataSets/UndirectedWeightedGraphData";
import { AnyGraphData, GraphDataDirectedWeighted, GraphDataMatrix, NodeEdgeGraph, ToNodeDirectedWeightedGraph, UserGraphTypes } from "./graphDataSets/allGraphData";
import { AnySearchExecutionData, SearchAlgorithmsTypes, SearchExecutionDataDirectedWeightedGraph, SearchExecutionDataMatrixGraph } from "./searchAlgorithms/allAlgorithmData";
import GraphAlgorithmsMatrix from "./searchAlgorithms/GraphAlgorithmsMatrix";
import GraphAlgorithmsDirectedWeighted from "./searchAlgorithms/GraphAlgorithmsDirectedWeighted";
import { AnyVisualisationData, VisualisationDataMatrix } from "./allVisualisationData";

export function getConverted(arr: NodeEdgeGraph[]): ToNodeDirectedWeightedGraph[] {
  return arr.map(node => {return { node , cost: 1 }});
}

function getProperGraphData(graphType: UserGraphTypes): AnyGraphData {
  switch (graphType) {
    case UserGraphTypes.matrix: return matrixGraphData;
    case UserGraphTypes.directed: return directedGraphData;
    case UserGraphTypes.directedWeighted: return directedWeightedGraphData;
    case UserGraphTypes.undirected: return undirectedGraphData;
    case UserGraphTypes.undirectedWeighted: return undirectedWeightedGraphData;
  }
}

export const getEmptySearchData = (type: SearchAlgorithmsTypes): AnySearchExecutionData => {
  return {
    type,
    listOfSteps: [],
    pathCost: Infinity,
    pathToEndNode: null,
    isEndNodeReached: false,
  };
}

function getProperAlgorithmData(graphData: AnyGraphData, algorithmType: SearchAlgorithmsTypes): AnySearchExecutionData {
  if (graphData.type === UserGraphTypes.matrix) {
    const graphDataTmp = graphData as GraphDataMatrix;
    const { dfs, bfs } = GraphAlgorithmsMatrix;
    const fun = (algorithmType === SearchAlgorithmsTypes.dfs) ? dfs : bfs;
    const data = fun(graphDataTmp);
    return data;
  } else {
    const graphDataTmp = graphData as GraphDataDirectedWeighted;
    const { dfs, bfs } = GraphAlgorithmsDirectedWeighted;
    const fun = (algorithmType === SearchAlgorithmsTypes.dfs) ? dfs : bfs;
    const data = fun(graphDataTmp);
    return data;
  }
}

export function getDefaultVisualisationData(): VisualisationDataMatrix {
  return getProperVisualisationData(UserGraphTypes.matrix, SearchAlgorithmsTypes.dfs) as VisualisationDataMatrix;
}

export function getProperVisualisationData(graphType: UserGraphTypes, algorithmType: SearchAlgorithmsTypes): AnyVisualisationData {
  const graphData = getProperGraphData(graphType);
  if (graphType === UserGraphTypes.matrix) {
    return {
      graphAndAlgorithm: {
        graphData: graphData as GraphDataMatrix,
        algorithmData: getProperAlgorithmData(graphData, algorithmType) as SearchExecutionDataMatrixGraph,
      },
      currStepIdx: -1,
    };
  }
  return {
    graphAndAlgorithm: {
      graphData: graphData as GraphDataDirectedWeighted,
      algorithmData: getProperAlgorithmData(graphData, algorithmType) as SearchExecutionDataDirectedWeightedGraph,
    },
    currStepIdx: -1,
  };
}