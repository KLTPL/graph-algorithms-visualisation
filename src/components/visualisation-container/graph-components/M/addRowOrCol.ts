import { NodeTypesM } from "../../../../visualisationData/typesGraphData";
import { VisualisationDataM } from "../../../../visualisationData/typesVisualisationData";

export function addRowStart({ graph, startNode, endNode }: VisualisationDataM): void {
  if (graph.length >= 10) {
    return;
  }
  const rowLength = graph[0].length;
  graph.unshift(Array(rowLength).fill(NodeTypesM.empty));

  startNode.y++;
  endNode.y++;
}
export function addRowEnd({ graph }: VisualisationDataM): void {
  if (graph.length >= 10) {
    return;
  }
  const rowLength = graph[0].length;
  graph.push(Array(rowLength).fill(NodeTypesM.empty));
}
export function addColStart({ graph, startNode, endNode }: VisualisationDataM): void {
  if (graph[0].length >= 10) {
    return;
  }
  for (const row of graph) {
    row.unshift(NodeTypesM.empty);
  }
  startNode.x++;
  endNode.x++;
}
export function addColEnd({ graph }: VisualisationDataM): void {
  if (graph[0].length >= 10) {
    return;
  }
  for (const row of graph) {
    row.push(NodeTypesM.empty);
  }
}