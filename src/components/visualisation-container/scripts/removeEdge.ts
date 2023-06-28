import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import { EdgeE } from "./getEdges";

export default function removeEdge(
  { graph, isUOrUW }: VisualisationDataDW,
  [node1, node2]: EdgeE
) {
  for (let i = 0; i < graph[node1].length; i++) {
    if (graph[node1][i].node === node2) {
      graph[node1].splice(i, 1);
      break;
    }
  }
  if (isUOrUW) {
    for (let i = 0; i < graph[node2].length; i++) {
      if (graph[node2][i].node === node1) {
        graph[node2].splice(i, 1);
        break;
      }
    }
  }
}
