import graphDataD from "./graphDataSets/D";
import graphDataDW from "./graphDataSets/DW";
import graphDataM from "./graphDataSets/M";
import graphDataU from "./graphDataSets/U";
import graphDataUW from "./graphDataSets/UW";
import {
  AnyGraph,
  AnyGraphData,
  GraphDataDW,
  GraphDataM,
  NodeE,
  ToNodeDW,
  UserGraphTypes,
} from "./typesGraphData";
import {
  AnySearchExecutionData,
  SearchAlgorithmsTypes,
  SearchExecutionDataDW,
  SearchExecutionDataM,
} from "./typesAlgorithmData";
import { dfs as dfsM, bfs as bfsM } from "./searchAlgorithms/M/dfsAndBfs";
import { dfs as dfsDW, bfs as bfsDW } from "./searchAlgorithms/DW/dfsAndBfs";
import { dijkstras as dijkstrasM } from "./searchAlgorithms/M/dijkstras";
import { dijkstras as dijkstrasDW } from "./searchAlgorithms/DW/dijkstras";
import {
  AnyVisualisationData,
  VisualisationDataM,
} from "./typesVisualisationData";

export function getConverted(arr: NodeE[]): ToNodeDW[] {
  return arr.map(node => {
    return { node, cost: 1 };
  });
}

function getProperGraphData(graphType: UserGraphTypes): AnyGraphData {
  switch (graphType) {
    case UserGraphTypes.M:
      return graphDataM;
    case UserGraphTypes.D:
      return graphDataD;
    case UserGraphTypes.DW:
      return graphDataDW;
    case UserGraphTypes.U:
      return graphDataU;
    case UserGraphTypes.UW:
      return graphDataUW;
  }
}

export const getEmptySearchData = (
  type: SearchAlgorithmsTypes
): AnySearchExecutionData => {
  return {
    algorithmType: type,
    listOfSteps: [],
    pathCost: Infinity,
    pathToEndNode: null,
    isEndNodeReached: false,
  };
};

function getProperAlgorithmData(
  graphData: AnyGraphData,
  algorithmType: SearchAlgorithmsTypes
): AnySearchExecutionData {
  if (graphData.graphType === UserGraphTypes.M) {
    const graphDataTmp = graphData as GraphDataM;
    const fun = (function () {
      switch (algorithmType) {
        case SearchAlgorithmsTypes.Dfs:
          return dfsM;
        case SearchAlgorithmsTypes.Bfs:
          return bfsM;
        case SearchAlgorithmsTypes.Dijkstras:
          return dijkstrasM;
      }
    })();
    return fun(graphDataTmp);
  }
  const graphDataTmp = graphData as GraphDataDW;
  const fun = (function () {
    switch (algorithmType) {
      case SearchAlgorithmsTypes.Dfs:
        return dfsDW;
      case SearchAlgorithmsTypes.Bfs:
        return bfsDW;
      case SearchAlgorithmsTypes.Dijkstras:
        return dijkstrasDW;
    }
  })();
  return fun(graphDataTmp);
}

export function getDefaultVisualisationData(): VisualisationDataM {
  return getProperVisualisationData(
    UserGraphTypes.M,
    SearchAlgorithmsTypes.Dfs
  ) as VisualisationDataM;
}

export function getProperVisualisationData(
  graphType: UserGraphTypes,
  algorithmType: SearchAlgorithmsTypes
): AnyVisualisationData {
  const graphData = getProperGraphData(graphType);
  const algorithmData = getProperAlgorithmData(graphData, algorithmType);
  if (graphType === UserGraphTypes.M) {
    return {
      ...(graphData as GraphDataM),
      ...(algorithmData as SearchExecutionDataM),
    };
  }
  return {
    ...(graphData as GraphDataDW),
    ...(algorithmData as SearchExecutionDataDW),
  };
}
