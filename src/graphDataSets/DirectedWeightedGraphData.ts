import { bfs, dfs } from "../searchAlgorithms/directedWeightedGraphAlgorithms";
import { DirectedWeightedGraphData, UserGraphTypes } from "./allGraphData";

const directedWeightedGraphData: DirectedWeightedGraphData = {
  graph: new Map([
    ["a", [{node: "b", cost: 3}, {node: "c", cost: 6}]],
    ["b", [{node: "c", cost: 4}, {node: "d", cost: 4}, {node: "e", cost: 11}]],
    ["c", [{node: "d", cost: 8}, {node: "g", cost: 11}]],
    ["d", [{node: "e", cost: -4}, {node: "f", cost: 5}, {node: "g", cost: 2}]],
    ["e", [{node: "h", cost: 9}]],
    ["f", [{node: "h", cost: 1}]],
    ["g", [{node: "h", cost: 2}]],
    ["h", []],
  ]),
  startNode: "a",
  endNode: "h",
  type: UserGraphTypes.directedWeighted,
  dfs: dfs,
  bfs: bfs,
}

export default directedWeightedGraphData;