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
  const isUOrUW =
    graphType === UserGraphTypes.U || graphType === UserGraphTypes.UW;
  const edges: EdgeData[] = [];
  const edgesCodes = new Set<string>();
  // edgesCodes is a system that makes sure that on UW or U graphs edges don't reapeat
  for (const node of graph.keys()) {
    const neighbours = graph[node] as ToNodeDW[];
    for (const { node: neighbour, cost } of neighbours) {
      const strCode =
        node < neighbour ? `${node};${neighbour}` : `${neighbour};${node}`;
      if (!isUOrUW || !edgesCodes.has(strCode)) {
        edgesCodes.add(strCode);
        edges.push({ edge: [node, neighbour], cost });
      }
    }
  }
  return edges;
}

export default getEdges;
