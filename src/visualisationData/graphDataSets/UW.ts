import { GraphDataDW, UserGraphTypes } from "../typesGraphData";

const graphDataUW: GraphDataDW = {
  graph: [
    [
      { node: 1, cost: 1 },
      { node: 2, cost: 6 },
      { node: 3, cost: 5 },
    ],
    [
      { node: 0, cost: 1 },
      { node: 2, cost: 6 },
    ],
    [
      { node: 0, cost: 6 },
      { node: 4, cost: 7 },
      { node: 5, cost: 3 },
    ],
    [
      { node: 0, cost: 5 },
      { node: 5, cost: 2 },
      { node: 6, cost: 10 },
    ],
    [
      { node: 2, cost: 7 },
      { node: 7, cost: 12 },
    ],
    [
      { node: 2, cost: 3 },
      { node: 3, cost: 2 },
      { node: 7, cost: 8 },
    ],
    [
      { node: 3, cost: 10 },
      { node: 7, cost: 7 },
      { node: 8, cost: 3 },
    ],
    [
      { node: 4, cost: 12 },
      { node: 6, cost: 7 },
      { node: 8, cost: 8 },
    ],
    [
      { node: 6, cost: 3 },
      { node: 7, cost: 8 },
    ],
  ],
  startNode: 1,
  endNode: 8,
  graphType: UserGraphTypes.UW,
  isUOrUW: true,
  isDOrDW: false,
  isDWOrUW: true,
};

export default graphDataUW;
