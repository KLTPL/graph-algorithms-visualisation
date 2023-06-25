import { getConverted } from "../getProperDataFunctions";
import { GraphDataDW, UserGraphTypes } from "../typesGraphData";

const graphDataD: GraphDataDW = {
  graph: new Map([
    ["a", getConverted(["d"])],
    ["b", getConverted(["d"])],
    ["c", getConverted(["a", "b"])],
    ["d", getConverted(["g", "h"])],
    ["e", getConverted(["a", "d", "f"])],
    ["f", getConverted(["k", "j"])],
    ["g", getConverted(["i"])],
    ["h", getConverted(["i", "j"])],
    ["i", getConverted(["l"])],
    ["j", getConverted(["l", "m"])],
    ["k", getConverted(["j"])],
    ["l", []],
    ["m", []],
  ]),
  startNode: "a",
  endNode: "m",
  graphType: UserGraphTypes.D,
};

export default graphDataD;