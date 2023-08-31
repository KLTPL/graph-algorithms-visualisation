import { FieldM, GraphM } from "../../../../visualisationData/typesGraphData";
import { VisualisationDataM } from "../../../../visualisationData/typesVisualisationData";

function makeEndAndStartDifferent(graph: GraphM, startNode: FieldM): void {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  for (const dir of directions) {
    const newX = startNode.x + dir[0];
    const newY = startNode.y + dir[1];
    if (
      newX >= 0 &&
      newX < graph[0].length &&
      newY >= 0 &&
      newY < graph.length
    ) {
      startNode.x = newX;
      startNode.y = newY;
      break;
    }
  }
}

function adjustStartAndEndNodes(
  graph: GraphM,
  startNode: FieldM,
  endNode: FieldM
): void {
  if (startNode.x === endNode.x && startNode.y === endNode.y) {
    makeEndAndStartDifferent(graph, startNode);
  }
}

export function removeRowStart({
  graph,
  startNode,
  endNode,
}: VisualisationDataM): void {
  if (graph.length <= 2) {
    return;
  }
  if (startNode.y > 0) {
    startNode.y--;
  }
  if (endNode.y > 0) {
    endNode.y--;
  }

  graph.shift();

  adjustStartAndEndNodes(graph, startNode, endNode);
}
export function removeRowEnd({
  graph,
  startNode,
  endNode,
}: VisualisationDataM): void {
  if (graph.length <= 2) {
    return;
  }
  if (startNode.y === graph.length - 1) {
    startNode.y--;
  }
  if (endNode.y === graph.length - 1) {
    endNode.y--;
  }

  graph.pop();

  adjustStartAndEndNodes(graph, startNode, endNode);
}
export function removeColStart({
  graph,
  startNode,
  endNode,
}: VisualisationDataM): void {
  if (graph[0].length <= 2) {
    return;
  }
  if (startNode.x > 0) {
    startNode.x--;
  }
  if (endNode.x > 0) {
    endNode.x--;
  }

  for (const row of graph) {
    row.shift();
  }

  adjustStartAndEndNodes(graph, startNode, endNode);
}
export function removeColEnd({
  graph,
  startNode,
  endNode,
}: VisualisationDataM): void {
  if (graph[0].length <= 2) {
    return;
  }
  if (startNode.x === graph[0].length - 1) {
    startNode.x--;
  }
  if (endNode.x === graph[0].length - 1) {
    endNode.x--;
  }
  console.log(startNode, graph.length - 1);
  console.log(endNode);
  for (const row of graph) {
    row.pop();
  }

  adjustStartAndEndNodes(graph, startNode, endNode);
}
