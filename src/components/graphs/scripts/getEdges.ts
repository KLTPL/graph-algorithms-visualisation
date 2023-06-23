import {
  DirectedWeightedGraph,
  NodeEdgeGraph,
  ToNodeDirectedWeightedGraph,
} from "../../../visualisationData/typesGraphData";

type Edge = NodeEdgeGraph[]; // of length 2

function getEdges(graph: DirectedWeightedGraph): Edge[] {
  const edges: Edge[] = [];
  const edgesCodes = new Set<string>();
  for (const node of graph.keys()) {
    const neighbours = graph.get(node) as ToNodeDirectedWeightedGraph[];
    for (const { node: neighbour } of neighbours) {
      const strCode =
        node.charCodeAt(0) < neighbour.charCodeAt(0)
          ? `${node};${neighbour}`
          : `${neighbour};${node}`;
      if (!edgesCodes.has(strCode)) {
        edgesCodes.add(strCode);
        edges.push([node, neighbour]);
      }
    }
  }
  return edges;
}

export default getEdges;
