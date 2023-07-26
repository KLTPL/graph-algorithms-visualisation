import {
  FieldM,
  NodeTypesM,
} from "../../../../visualisationData/typesGraphData";
import { VisualisationDataM } from "../../../../visualisationData/typesVisualisationData";

interface NodeDataM {
  visualisationData: VisualisationDataM;
  currStepIdx: number;
  backtrackCount: number;
  r: number;
  c: number;
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
    [true, "aspect-square flex flex-col items-center justify-center"],
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
