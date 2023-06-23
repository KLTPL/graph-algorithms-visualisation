import {
  FieldMatrixGraph,
  NodeTypesMatrixGraph,
} from "../../../../visualisationData/typesGraphData";
import { VisualisationDataMatrix } from "../../../../visualisationData/typesVisualisationData";

type NodeMatrixProps = {
  visualisationData: VisualisationDataMatrix;
  currStepIdx: number;
  backtrackCount: number;
  r: number;
  c: number;
};

function NodeMatrix({
  visualisationData,
  backtrackCount,
  currStepIdx,
  c,
  r,
}: NodeMatrixProps) {
  const className = getColorClassNamesForNode(
    visualisationData,
    currStepIdx,
    backtrackCount,
    r,
    c
  );
  return (
    <div className={`aspect-square grid place-content-center ${className}`} />
  );
}

function getColorClassNamesForNode(
  visualisationData: VisualisationDataMatrix,
  currStepIdx: number,
  backtrackCount: number,
  r: number,
  c: number
): string {
  const listOfSteps = visualisationData.listOfSteps;
  const fieldType = visualisationData.graph[r][c];
  const isStartNode =
    r === visualisationData.startNode.y && c === visualisationData.startNode.x;
  const isStartEndNode =
    r === visualisationData.endNode.y && c === visualisationData.endNode.x;
  const isStartOrEnd = isStartNode || isStartEndNode;
  const isEmpty = fieldType === NodeTypesMatrixGraph.empty;
  const isRock = fieldType === NodeTypesMatrixGraph.rock;
  const isNodeVisited = isStepAlreadyMade(currStepIdx, listOfSteps, r, c);
  const isCurrNode = isNodeCurrNode(visualisationData, currStepIdx, r, c);
  const isReachedEndNode = isStartEndNode && isNodeVisited;
  const isOnBacktrack = isNodeOnBacktrack(
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

function isStepAlreadyMade(
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

function isNodeOnBacktrack(
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

function isNodeCurrNode(
  visualisationData: VisualisationDataMatrix,
  currStepIdx: number,
  r: number,
  c: number
): boolean {
  const field = visualisationData.listOfSteps[currStepIdx];
  return field !== undefined && field.x === c && field.y === r;
}

export default NodeMatrix;
