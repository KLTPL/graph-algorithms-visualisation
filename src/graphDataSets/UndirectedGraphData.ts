import {  DirectedWeightedGraphData, UserGraphTypes } from "./allGraphData";
import { getConverted } from "./graphDataHelperFunctions";
import { dfs, bfs } from "../searchAlgorithms/directedWeightedGraphAlgorithms";

const undirectedGraphData: DirectedWeightedGraphData = {
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
  dfs: dfs,
  bfs: bfs,
}

export default undirectedGraphData;