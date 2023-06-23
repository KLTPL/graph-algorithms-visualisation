import { getConverted } from "../getProperDataFunctions";
import { GraphDataDW, UserGraphTypes } from "../typesGraphData";

const graphDataU: GraphDataDW = {
  graph: new Map([
    ["a", getConverted(["h", "j", "l"])],
    ["b", getConverted(["i", "k"])],
    ["c", getConverted(["d", "m"])],
    ["d", getConverted(["c", "e", "h"])],
    ["e", getConverted(["d"])],
    ["f", getConverted(["g"])],
    ["g", getConverted(["f", "h"])],
    ["h", getConverted(["a", "d", "g", "l"])],
    ["i", getConverted(["b", "j", "m"])],
    ["j", getConverted(["a", "i", "k"])],
    ["k", getConverted(["b", "j"])],
    ["l", getConverted(["a", "h"])],
    ["m", getConverted(["c", "i"])],
  ]),
  startNode: "k",
  endNode: "e",
  graphType: UserGraphTypes.U,
};

export default graphDataU;
