import { getConverted } from "../getProperDataFunctions";
import { GraphDataDirectedWeighted, UserGraphTypes } from "../typesGraphData";
 
const directedGraphData: GraphDataDirectedWeighted = {
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
  graphType: UserGraphTypes.directed,
}

export default directedGraphData;