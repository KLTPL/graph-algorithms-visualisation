import { GraphDataDW, UserGraphTypes } from "../typesGraphData";

const graphDataDW: GraphDataDW = {
  graph: [
    [
      { node: 1, cost: 3 },
      { node: 2, cost: 6 },
    ],
    [
      { node: 2, cost: 4 },
      { node: 3, cost: 4 },
      { node: 4, cost: 11 },
    ],
    [
      { node: 3, cost: 8 },
      { node: 6, cost: 11 },
    ],
    [
      { node: 2, cost: -2 },
      { node: 4, cost: -4 },
      { node: 5, cost: 5 },
      { node: 6, cost: 2 },
    ],
    [
      { node: 3, cost: 5 },
      { node: 7, cost: 9 },
    ],
    [{ node: 7, cost: 1 }],
    [{ node: 7, cost: 2 }],
    [],
  ],
  startNode: 0,
  endNode: 7,
  graphType: UserGraphTypes.DW,
  isUOrUW: false,
  isDOrDW: true,
  isDWOrUW: true,
};

export default graphDataDW;
