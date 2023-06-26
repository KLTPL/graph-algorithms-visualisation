import {
  GraphDW,
  NodeE,
  ToNodeDW,
  UserGraphTypes,
} from "../../../visualisationData/typesGraphData";
import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";

export type EdgeE = NodeE[]; // of length 2
export type EdgeData = { edge: EdgeE; cost: number };

function getEdges(visualisationData: VisualisationDataDW): EdgeData[] {
  const { graph, graphType } = visualisationData;
  const isUndirected =
    graphType === UserGraphTypes.U || graphType === UserGraphTypes.UW;
  const edges: EdgeData[] = [];
  const edgesCodes = new Set<string>();
  for (const node of graph.keys()) {
    const neighbours = graph.get(node) as ToNodeDW[];
    for (const { node: neighbour, cost } of neighbours) {
      const strCode =
        node.charCodeAt(0) < neighbour.charCodeAt(0)
          ? `${node};${neighbour}`
          : `${neighbour};${node}`;
      if (!isUndirected || !edgesCodes.has(strCode)) {
        edgesCodes.add(strCode);
        edges.push({ edge: [node, neighbour], cost });
      }
    }
  }
  return edges;
}

export default getEdges;
