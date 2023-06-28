import { getConverted } from "../getProperDataFunctions";
import { GraphDataDW, UserGraphTypes } from "../typesGraphData";

const graphDataU: GraphDataDW = {
  graph: [
    getConverted([7, 9, 11]),
    getConverted([8, 10]),
    getConverted([3, 12]),
    getConverted([2, 4, 7]),
    getConverted([3]),
    getConverted([6]),
    getConverted([5, 7]),
    getConverted([0, 3, 6, 11]),
    getConverted([1, 9, 12]),
    getConverted([0, 8, 10]),
    getConverted([1, 9]),
    getConverted([0, 7]),
    getConverted([2, 8]),
  ],
  startNode: 10,
  endNode: 4,
  graphType: UserGraphTypes.U,
  isUOrUW: true,
  isDOrDW: false,
  isDWOrUW: false,
};

export default graphDataU;
