import { DirectedWeightedGraphData, UserGraphTypes } from "./allGraphData";
import { getConverted } from "./graphDataHelperFunctions";
import { dfs, bfs } from "../searchAlgorithms/directedWeightedGraphAlgorithms";
 
const directedGraphData: DirectedWeightedGraphData = {
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
  type: UserGraphTypes.directed,
  dfs: dfs,
  bfs: bfs,
}

export default directedGraphData;