export type NodePosition = { left: number; top: number };
export type NodesPositions = NodePosition[];

function getRandomNodesPositions(nodesAmount: number): NodesPositions {
  // return [
  //   { left: 81, top: 66 },
  //   { left: 74, top: 99 },
  //   { left: 77, top: 84 },
  //   { left: 73, top: 7 },
  //   { left: 9, top: 68 },
  //   { left: 36, top: 67 },
  //   { left: 40, top: 32 },
  //   { left: 61, top: 78 },
  //   { left: 1, top: 61 },
  //   { left: 30, top: 66 },
  //   { left: 12, top: 93 },
  //   { left: 30, top: 35 },
  //   { left: 90, top: 50 },
  // ];
  return Array(nodesAmount)
    .fill(null)
    .map(() => {
      return {
        left: Math.floor(Math.random() * 100),
        top: Math.floor(Math.random() * 100),
      };
    });
}

export default getRandomNodesPositions;
