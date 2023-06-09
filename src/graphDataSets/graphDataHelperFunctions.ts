import { AnySearchExecutionData, SearchAlgorithmsTypes, SearchExecutionDataEdgeGraph, SearchExecutionDataMatrixGraph } from "../searchAlgorithms/allAlgorithmData";
import directedGraphData from "./DirectedGraphData";
import directedWeightedGraphData from "./DirectedWeightedGraphData";
import matrixGraphData from "./MatrixGraphData";
import undirectedGraphData from "./UndirectedGraphData";
import { AnyGraphData, DirectedWeightedGraphData, UserGraphTypes, MatrixGraphData, NodeEdgeGraph, ToNodeDirectedWeightedGraph } from "./allGraphData";


export function getConverted(arr: NodeEdgeGraph[]): ToNodeDirectedWeightedGraph[] {
  return arr.map(node => {return { node , cost: 1 }});
}

export function getProperGraphData(graphType: UserGraphTypes): AnyGraphData {
  switch (graphType) {
    case UserGraphTypes.matrix: return matrixGraphData;
    case UserGraphTypes.directed: return directedGraphData;
    case UserGraphTypes.directedWeighted: return directedWeightedGraphData;
    case UserGraphTypes.undirected: return undirectedGraphData;
    case UserGraphTypes.undirectedWeighted: return undirectedGraphData;
  }
}

export function executeProperGraphAlgorithm(graphData: AnyGraphData, data: AnySearchExecutionData, algorithmType: SearchAlgorithmsTypes): void {
  console.log("graphData:", graphData);
  if (graphData.type === UserGraphTypes.matrix) {
    const graphDataTmp = graphData as MatrixGraphData;
    const fun = (algorithmType === SearchAlgorithmsTypes.dfs) ? graphDataTmp.dfs : graphDataTmp.bfs;
    fun(graphDataTmp, data as SearchExecutionDataMatrixGraph);
  } else {
    const graphDataTmp = graphData as DirectedWeightedGraphData;
    const fun = (algorithmType === SearchAlgorithmsTypes.dfs) ? graphDataTmp.dfs : graphDataTmp.bfs;
    fun(graphDataTmp, data as SearchExecutionDataEdgeGraph);
  }
}