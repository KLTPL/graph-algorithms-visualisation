import {
  FieldMatrixGraph,
  NodeEdgeGraph,
  NodeTypesMatrixGraph,
} from "../../../visualisationData/typesGraphData";
import {
  VisualisationDataDirectedWeighted,
  VisualisationDataMatrix,
} from "../../../visualisationData/typesVisualisationData";

interface NodeDataMatrix {
  visualisationData: VisualisationDataMatrix;
  currStepIdx: number;
  backtrackCount: number;
  r: number;
  c: number;
}

interface NodeDataEdge {
  visualisationData: VisualisationDataDirectedWeighted;
  currStepIdx: number;
  backtrackCount: number;
  node: NodeEdgeGraph;
}

export function getClassNamesForNodeMatrix({
  visualisationData,
  currStepIdx,
  backtrackCount,
  r,
  c,
}: NodeDataMatrix): string {
  const listOfSteps = visualisationData.listOfSteps;
  const fieldType = visualisationData.graph[r][c];
  const isStartNode =
    r === visualisationData.startNode.y && c === visualisationData.startNode.x;
  const isEndNode =
    r === visualisationData.endNode.y && c === visualisationData.endNode.x;
  const isStartOrEnd = isStartNode || isEndNode;
  const isEmpty = fieldType === NodeTypesMatrixGraph.empty;
  const isRock = fieldType === NodeTypesMatrixGraph.rock;
  const isNodeVisited = isStepAlreadyMadeMatrix(currStepIdx, listOfSteps, r, c);
  const isCurrNode = isNodeCurrNodeMatrix(visualisationData, currStepIdx, r, c);
  const isReachedEndNode = isEndNode && isNodeVisited;
  const isOnBacktrack = isNodeOnBacktrackMatrix(
    visualisationData,
    backtrackCount,
    r,
    c
  );

  const conditionAndValuePairs = [
    [isEmpty && !isStartOrEnd && !isOnBacktrack, "bg-marixGraphFieldEmpty"],
    [isStartOrEnd && !isReachedEndNode, "bg-startAndEndNode"],
    [isRock, "bg-rock"],
    [isNodeVisited && !isReachedEndNode && !isOnBacktrack, "bg-primary"],
    [
      isCurrNode,
      "after:content-[''] after:rounded-[50%] after:bg-black after:w-[7px] after:h-[7px]",
    ],
    [isReachedEndNode, "bg-green"],
    [isOnBacktrack, "bg-orange"],
  ];

  return conditionAndValuePairs
    .filter(arr => arr[0])
    .map(arr => arr[1])
    .join(" ");
}

export function getClassNamesForNodeEdge({
  visualisationData,
  currStepIdx,
  backtrackCount,
  node,
}: NodeDataEdge): string {
  const listOfSteps = visualisationData.listOfSteps;
  const isStartNode = node === visualisationData.startNode;
  const isEndNode = node === visualisationData.endNode;
  const isStartOrEnd = isStartNode || isEndNode;
  const isNodeVisited = isStepAlreadyMadeEdge(currStepIdx, listOfSteps, node);
  const isCurrNode = isNodeCurrNodeEdge(visualisationData, currStepIdx, node);
  const isReachedEndNode = isEndNode && isNodeVisited;
  const isOnBacktrack = isNodeOnBacktrackEdge(
    visualisationData,
    backtrackCount,
    node
  );

  const conditionAndValuePairs = [
    [!isStartOrEnd && !isOnBacktrack, "bg-marixGraphFieldEmpty"],
    [isStartOrEnd && !isReachedEndNode, "bg-startAndEndNode"],
    [isNodeVisited && !isReachedEndNode && !isOnBacktrack, "bg-primary"],
    [
      isCurrNode,
      "after:content-[''] after:rounded-[50%] after:bg-black after:w-[7px] after:h-[7px]",
    ],
    [isReachedEndNode, "bg-green"],
    [isOnBacktrack, "bg-orange"],
  ];

  return conditionAndValuePairs
    .filter(arr => arr[0])
    .map(arr => arr[1])
    .join(" ");
}

function isStepAlreadyMadeMatrix(
  currStepIdx: number,
  listOfSteps: FieldMatrixGraph[],
  r: number,
  c: number
): boolean {
  for (let i = 0; i <= currStepIdx; i++) {
    const { x, y } = listOfSteps[i];
    if (x === c && y === r) {
      return true;
    }
  }
  return false;
}

function isStepAlreadyMadeEdge(
  currStepIdx: number,
  listOfSteps: NodeEdgeGraph[],
  node: NodeEdgeGraph
): boolean {
  for (let i = 0; i <= currStepIdx; i++) {
    if (node === listOfSteps[i]) {
      return true;
    }
  }
  return false;
}

function isNodeOnBacktrackMatrix(
  visualisationData: VisualisationDataMatrix,
  backtrackCount: number,
  r: number,
  c: number
): boolean {
  // after finding the end node algorithm backtracks to show visualisationData.pathToEndNode
  // backtrackCount is the count of how many nodes did the visualisation go back
  const path = visualisationData.pathToEndNode as FieldMatrixGraph[];
  for (let i = 1; i < backtrackCount; i++) {
    const newNode = path.at(-(i + 1));
    if (newNode !== undefined && r === newNode.y && c === newNode.x) {
      return true;
    }
  }
  return false;
}

function isNodeOnBacktrackEdge(
  visualisationData: VisualisationDataDirectedWeighted,
  backtrackCount: number,
  node: NodeEdgeGraph
): boolean {
  // after finding the end node algorithm backtracks to show visualisationData.pathToEndNode
  // backtrackCount is the count of how many nodes did the visualisation go back
  const path = visualisationData.pathToEndNode as NodeEdgeGraph[];
  for (let i = 1; i < backtrackCount; i++) {
    const newNode = path.at(-(i + 1));
    if (newNode !== undefined && node === newNode) {
      return true;
    }
  }
  return false;
}

function isNodeCurrNodeMatrix(
  visualisationData: VisualisationDataMatrix,
  currStepIdx: number,
  r: number,
  c: number
): boolean {
  const field = visualisationData.listOfSteps[currStepIdx];
  return field !== undefined && field.x === c && field.y === r;
}

function isNodeCurrNodeEdge(
  visualisationData: VisualisationDataDirectedWeighted,
  currStepIdx: number,
  node: NodeEdgeGraph
): boolean {
  const currNode = visualisationData.listOfSteps[currStepIdx];
  return currNode !== undefined && currNode === node;
}
