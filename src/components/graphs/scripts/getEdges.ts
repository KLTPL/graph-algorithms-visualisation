import {
  GraphDW,
  NodeE,
  ToNodeDW,
} from "../../../visualisationData/typesGraphData";

export type EdgeE = NodeE[]; // of length 2
export type EdgeData = { edge: EdgeE; cost: number };

function getEdges(graph: GraphDW): EdgeData[] {
  const edges: EdgeData[] = [];
  const edgesCodes = new Set<string>();
  for (const node of graph.keys()) {
    const neighbours = graph.get(node) as ToNodeDW[];
    for (const { node: neighbour, cost } of neighbours) {
      const strCode =
        node.charCodeAt(0) < neighbour.charCodeAt(0)
          ? `${node};${neighbour}`
          : `${neighbour};${node}`;
      if (!edgesCodes.has(strCode)) {
        edgesCodes.add(strCode);
        edges.push({ edge: [node, neighbour], cost });
      }
    }
  }
  return edges;
}

export default getEdges;
