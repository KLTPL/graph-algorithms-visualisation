export type NodePosition = { left: number; top: number };
export type NodesPositions = NodePosition[];

export function getDefaultNodesPositionsUndirected(): NodesPositions {
  return [
    { left: 40, top: 75 },
    { left: 25, top: 25 },
    { left: 55, top: 15 },
    { left: 70, top: 30 },
    { left: 75, top: 15 },
    { left: 90, top: 40 },
    { left: 85, top: 60 },
    { left: 60, top: 55 },
    { left: 45, top: 45 },
    { left: 30, top: 55 },
    { left: 10, top: 50 },
    { left: 70, top: 90 },
    { left: 35, top: 20 },
  ];
}
