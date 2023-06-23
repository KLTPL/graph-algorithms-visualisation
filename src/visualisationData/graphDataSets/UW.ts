import { GraphDataDW, UserGraphTypes } from "../typesGraphData";

const graphDataUW: GraphDataDW = {
  graph: new Map([
    [
      "a",
      [
        { node: "b", cost: 1 },
        { node: "c", cost: 6 },
        { node: "d", cost: 5 },
      ],
    ],
    [
      "b",
      [
        { node: "a", cost: 1 },
        { node: "c", cost: 6 },
      ],
    ],
    [
      "c",
      [
        { node: "a", cost: 6 },
        { node: "e", cost: 7 },
        { node: "f", cost: 3 },
      ],
    ],
    [
      "d",
      [
        { node: "a", cost: 5 },
        { node: "f", cost: 2 },
        { node: "g", cost: 10 },
      ],
    ],
    [
      "e",
      [
        { node: "c", cost: 7 },
        { node: "h", cost: 12 },
      ],
    ],
    [
      "f",
      [
        { node: "c", cost: 3 },
        { node: "d", cost: 2 },
        { node: "h", cost: 8 },
      ],
    ],
    [
      "g",
      [
        { node: "d", cost: 10 },
        { node: "h", cost: 7 },
        { node: "i", cost: 3 },
      ],
    ],
    [
      "h",
      [
        { node: "e", cost: 12 },
        { node: "g", cost: 7 },
        { node: "i", cost: 8 },
      ],
    ],
    [
      "i",
      [
        { node: "g", cost: 3 },
        { node: "h", cost: 8 },
      ],
    ],
  ]),
  startNode: "b",
  endNode: "i",
  graphType: UserGraphTypes.UW,
};

export default graphDataUW;
