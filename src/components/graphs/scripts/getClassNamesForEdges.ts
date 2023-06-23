import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import { Edge } from "./getEdges";

export function getClassNamesForEdgeU(
  edge: Edge,
  visualisationData: VisualisationDataDW,
  currStepIdx: number,
  backtrackCount: number,
) {
  const isVisited = isEdgeVisited(edge, visualisationData, currStepIdx);
  const isOnBacktrack = isNodeOnBacktrack();
  const conditionAndValuePairs = [
    [!isVisited, "bg-black"],
    [isVisited, "bg-primary"],
    
  ];

  return conditionAndValuePairs
    .filter(arr => arr[0])
    .map(arr => arr[1])
    .join(" ");
}

function isEdgeVisited(
  [node1, node2]: Edge,
  visualisationData: VisualisationDataDW,
  currStepIdx: number
): boolean {
  if (currStepIdx === -1) {
    return false;
  }
  const listOfSteps = [
    visualisationData.startNode,
    ...visualisationData.listOfSteps,
  ];
  currStepIdx++;
  for (let i = 0; i < currStepIdx; i++) {
    const currNode1 = listOfSteps[i];
    const currNode2 = listOfSteps[i + 1];
    if (
      (currNode1 === node1 && currNode2 === node2) ||
      (currNode1 === node2 && currNode2 === node1)
    ) {
      return true;
    }
  }
  return false;
}

function isNodeOnBacktrack(): boolean {
  return false;
}