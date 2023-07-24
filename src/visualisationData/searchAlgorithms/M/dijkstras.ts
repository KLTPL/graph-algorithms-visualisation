import { getEmptySearchData } from "../../getProperDataFunctions";
import {
  SearchAlgorithmFunM as SearchAlgorithmFunHere,
  SearchAlgorithmsTypes,
  SearchExecutionDataM as SearchExecutionDataHere,
} from "../../typesAlgorithmData";
import {
  GraphDataM as GraphDataHere,
} from "../../typesGraphData";

const dijsktras: SearchAlgorithmFunHere = function (
  graphData: GraphDataHere
): SearchExecutionDataHere {
  return getEmptySearchData(
    SearchAlgorithmsTypes.Dijsktras
  ) as SearchExecutionDataHere;
};

export { dijsktras };
