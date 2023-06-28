import { StepDW } from "../../../visualisationData/typesAlgorithmData";
import {
  FieldM,
  NodeE,
  NodeTypesM,
} from "../../../visualisationData/typesGraphData";
import {
  VisualisationDataDW,
  VisualisationDataM,
} from "../../../visualisationData/typesVisualisationData";

interface NodeDataM {
  visualisationData: VisualisationDataM;
  currStepIdx: number;
  backtrackCount: number;
  r: number;
  c: number;
}

interface NodeDataE {
  visualisationData: VisualisationDataDW;
  currStepIdx: number;
  backtrackCount: number;
  node: NodeE;
}

export function getClassNamesForNodeM({
  visualisationData,
  currStepIdx,
  backtrackCount,
  r,
  c,
}: NodeDataM): string {
  const listOfSteps = visualisationData.listOfSteps;
  const fieldType = visualisationData.graph[r][c];
  const isStartNode =
    r === visualisationData.startNode.y && c === visualisationData.startNode.x;
  const isEndNode =
    r === visualisationData.endNode.y && c === visualisationData.endNode.x;
  const isStartOrEnd = isStartNode || isEndNode;
  const isEmpty = fieldType === NodeTypesM.empty;
  const isRock = fieldType === NodeTypesM.rock;
  const isNodeVisited = isStepAlreadyMadeM(currStepIdx, listOfSteps, r, c);
  const isCurrNode = isNodeCurrNodeM(
    visualisationData,
    currStepIdx,
    r,
    c,
    isStartNode
  );
  const isReachedStartOrEndNode =
    (isEndNode && isNodeVisited) ||
    isEndNodeReachedM(isStartNode, visualisationData, backtrackCount);
  const isOnBacktrack = isNodeOnBacktrackM(
    visualisationData,
    backtrackCount,
    r,
    c
  );

  const conditionAndValuePairs = [
    [true, "aspect-square grid place-content-center"],
    [isEmpty && !isStartOrEnd && !isOnBacktrack, "bg-nodeEmpty"],
    [isStartOrEnd && !isReachedStartOrEndNode, "bg-nodeStartOrEnd"],
    [isRock, "bg-nodeRock"],
    [isNodeVisited && !isReachedStartOrEndNode && !isOnBacktrack, "bg-primary"],
    [
      isCurrNode,
      "after:content-[''] after:rounded-[50%] after:bg-black after:w-[7px] after:h-[7px]",
    ],
    [isReachedStartOrEndNode, "bg-nodeEndReached"],
    [isOnBacktrack, "bg-nodeBacktrack"],
  ];

  return conditionAndValuePairs
    .filter(arr => arr[0])
    .map(arr => arr[1])
    .join(" ");
}

export function getClassNamesForNodeE({
  visualisationData,
  currStepIdx,
  backtrackCount,
  node,
}: NodeDataE): string {
  const listOfSteps = visualisationData.listOfSteps;
  const isStartNode = node === visualisationData.startNode;
  const isEndNode = node === visualisationData.endNode;
  const isStartOrEnd = isStartNode || isEndNode;
  const isNodeVisited = isStepAlreadyMadeE(currStepIdx, listOfSteps, node);
  const isCurrNode = isNodeCurrNodeE(
    visualisationData,
    currStepIdx,
    node,
    isStartNode
  );
  const isReachedStartOrEndNode =
    (isEndNode && isNodeVisited) ||
    isEndNodeReachedE(isStartNode, visualisationData, backtrackCount);
  const isOnBacktrack = isNodeOnBacktrackE(
    visualisationData,
    backtrackCount,
    node
  );

  const conditionAndValuePairs = [
    [
      true,
      "absolute rounded-[100%] grid place-content-center border-solid border-2 z-50 border-nodeBorder select-none hover:cursor-grab",
    ],
    [!isStartOrEnd && !isOnBacktrack, "bg-nodeEmpty"],
    [isStartOrEnd && !isReachedStartOrEndNode, "bg-nodeStartOrEnd"],
    [isNodeVisited && !isReachedStartOrEndNode && !isOnBacktrack, "bg-primary"],
    [
      isCurrNode,
      "after:content-[''] after:rounded-[50%] after:bg-black after:w-[7px] after:h-[7px]",
    ],
    [isReachedStartOrEndNode, "bg-nodeEndReached"],
    [isOnBacktrack, "bg-nodeBacktrack"],
  ];

  return conditionAndValuePairs
    .filter(arr => arr[0])
    .map(arr => arr[1])
    .join(" ");
}

function isStepAlreadyMadeM(
  currStepIdx: number,
  listOfSteps: FieldM[],
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

function isStepAlreadyMadeE(
  currStepIdx: number,
  listOfSteps: StepDW[],
  node: NodeE
): boolean {
  for (let i = 0; i <= currStepIdx; i++) {
    if (node === listOfSteps[i].to) {
      return true;
    }
  }
  return false;
}

function isNodeOnBacktrackM(
  visualisationData: VisualisationDataM,
  backtrackCount: number,
  r: number,
  c: number
): boolean {
  // after finding the end node algorithm backtracks to show visualisationData.pathToEndNode
  // backtrackCount is the count of how many nodes did the visualisation go back
  const path = visualisationData.pathToEndNode as FieldM[];
  for (let i = 1; i < backtrackCount; i++) {
    const newNode = path.at(-(i + 1));
    if (newNode !== undefined && r === newNode.y && c === newNode.x) {
      return true;
    }
  }
  return false;
}

function isNodeOnBacktrackE(
  visualisationData: VisualisationDataDW,
  backtrackCount: number,
  node: NodeE
): boolean {
  // after finding the end node algorithm backtracks to show visualisationData.pathToEndNode
  // backtrackCount is the count of how many nodes did the visualisation go back
  const path = visualisationData.pathToEndNode as NodeE[];
  for (let i = 1; i < backtrackCount; i++) {
    const newNode = path.at(-(i + 1));
    if (newNode !== undefined && node === newNode) {
      return true;
    }
  }
  return false;
}

function isNodeCurrNodeM(
  visualisationData: VisualisationDataM,
  currStepIdx: number,
  r: number,
  c: number,
  isStartNode: boolean
): boolean {
  if (currStepIdx === -1) {
    return isStartNode;
  }
  const field = visualisationData.listOfSteps[currStepIdx];
  return field !== undefined && field.x === c && field.y === r;
}

function isNodeCurrNodeE(
  visualisationData: VisualisationDataDW,
  currStepIdx: number,
  node: NodeE,
  isStartNode: boolean
): boolean {
  if (currStepIdx === -1) {
    return isStartNode;
  }
  const currNode = visualisationData.listOfSteps[currStepIdx];
  return currNode !== undefined && currNode.to === node;
}

function isEndNodeReachedE(
  isStartNode: boolean,
  visualisationData: VisualisationDataDW,
  backtrackCount: number
): boolean {
  if (!visualisationData.isEndNodeReached) {
    return false;
  }
  const pathLen = (visualisationData.pathToEndNode as NodeE[]).length;
  return isStartNode && backtrackCount === pathLen + 1;
}

function isEndNodeReachedM(
  isStartNode: boolean,
  visualisationData: VisualisationDataM,
  backtrackCount: number
): boolean {
  if (!visualisationData.isEndNodeReached) {
    return false;
  }
  const pathLen = (visualisationData.pathToEndNode as FieldM[]).length;
  return isStartNode && backtrackCount === pathLen + 1;
}
