import { StepDW } from "../../../../visualisationData/typesAlgorithmData";
import { NodeE } from "../../../../visualisationData/typesGraphData";
import { VisualisationDataDW } from "../../../../visualisationData/typesVisualisationData";
import { VisualisationPointerTools } from "../../../visualisation-tools/VisualisationTools";

interface NodeDataE {
  visualisationData: VisualisationDataDW;
  currStepIdx: number;
  backtrackCount: number;
  node: NodeE;
  isNode1InNewEdge: boolean;
  pointerTool: VisualisationPointerTools;
}

export function getClassNamesForNodeE({
  visualisationData,
  currStepIdx,
  backtrackCount,
  node,
  isNode1InNewEdge,
  pointerTool
}: NodeDataE): string {
  const listOfSteps = visualisationData.listOfSteps;
  const isStartNode = node === visualisationData.startNode.current;
  const isEndNode = node === visualisationData.endNode.current;
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
      "absolute rounded-[100%] grid place-content-center border-solid border-2 z-50 border-nodeBorder select-none cursor-grab",
    ],
    [pointerTool !== VisualisationPointerTools.NoTool && pointerTool !== VisualisationPointerTools.NewNode, "cursor-pointer"],
    [pointerTool === VisualisationPointerTools.NewNode, "cursor-default"],
    [!isStartOrEnd && !isOnBacktrack && !isNode1InNewEdge, "bg-nodeEmpty"],
    [
      isStartOrEnd && !isReachedStartOrEndNode && !isNode1InNewEdge,
      "bg-nodeStartOrEnd",
    ],
    [
      (isNodeVisited && !isReachedStartOrEndNode && !isOnBacktrack) ||
        isNode1InNewEdge,
      "bg-primary",
    ],
    [
      isCurrNode,
      "after:content-[''] after:rounded-[50%] after:bg-black after:w-[7px] after:h-[7px] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:-translate-y-[5%] after:absolute",
    ],
    [isReachedStartOrEndNode && !isNode1InNewEdge, "bg-nodeEndReached"],
    [isOnBacktrack && !isNode1InNewEdge, "bg-nodeBacktrack"],
  ];

  return conditionAndValuePairs
    .filter(arr => arr[0])
    .map(arr => arr[1])
    .join(" ");
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
