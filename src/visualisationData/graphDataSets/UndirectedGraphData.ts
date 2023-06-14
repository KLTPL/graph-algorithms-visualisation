import { getConverted } from "../getProperDataFunctions";
import {  GraphDataDirectedWeighted, UserGraphTypes } from "./allGraphData";

const undirectedGraphData: GraphDataDirectedWeighted = {
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
  type: UserGraphTypes.undirected,
}

export default undirectedGraphData;