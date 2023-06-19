import directedGraphData from "./graphDataSets/DirectedGraphData";
import directedWeightedGraphData from "./graphDataSets/DirectedWeightedGraphData";
import matrixGraphData from "./graphDataSets/MatrixGraphData";
import undirectedGraphData from "./graphDataSets/UndirectedGraphData";
import undirectedWeightedGraphData from "./graphDataSets/UndirectedWeightedGraphData";
import { AnyGraphData, GraphDataDirectedWeighted, GraphDataMatrix, NodeEdgeGraph, ToNodeDirectedWeightedGraph, UserGraphTypes } from "./typesGraphData";
import { AnySearchExecutionData, SearchAlgorithmsTypes, SearchExecutionDataDirectedWeightedGraph, SearchExecutionDataMatrixGraph } from "./typesAlgorithmData";
import GraphAlgorithmsMatrix from "./searchAlgorithms/GraphAlgorithmsMatrix";
import GraphAlgorithmsDirectedWeighted from "./searchAlgorithms/GraphAlgorithmsDirectedWeighted";
import { AnyVisualisationData, VisualisationDataMatrix } from "./typesVisualisationData";

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
    algorithmType: type,
    listOfSteps: [],
    pathCost: Infinity,
    pathToEndNode: null,
    isEndNodeReached: false,
  };
}

function getProperAlgorithmData(graphData: AnyGraphData, algorithmType: SearchAlgorithmsTypes): AnySearchExecutionData {
  if (graphData.graphType === UserGraphTypes.matrix) {
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
  const algorithmData = getProperAlgorithmData(graphData, algorithmType)
  if (graphType === UserGraphTypes.matrix) {
    return {
      ...graphData as GraphDataMatrix,
      ...algorithmData as SearchExecutionDataMatrixGraph,
    };
  }
  return {
    ...graphData as GraphDataDirectedWeighted,
    ...algorithmData as SearchExecutionDataDirectedWeightedGraph,
  };
}