import { getConverted } from "../getProperDataFunctions";
import { GraphDataDW, UserGraphTypes } from "../typesGraphData";

const graphDataD: GraphDataDW = {
  graph: [
    getConverted([3]),
    getConverted([3]),
    getConverted([0, 1]),
    getConverted([6, 7]),
    getConverted([0, 3, 5]),
    getConverted([10, 9]),
    getConverted([8]),
    getConverted([8, 9]),
    getConverted([11]),
    getConverted([5, 11, 12, 7]),
    getConverted([9]),
    [],
    [],
  ],
  startNode: { current: 0 },
  endNode: { current: 12 },
  graphType: UserGraphTypes.D,
  isUOrUW: false,
  isDOrDW: true,
  isDWOrUW: false,
};

export default graphDataD;
