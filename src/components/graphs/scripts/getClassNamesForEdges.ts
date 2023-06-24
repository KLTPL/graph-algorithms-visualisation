import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import { Edge } from "./getEdges";

export function getClassNamesForEdgeU(
  edge: Edge,
  visualisationData: VisualisationDataDW,
  currStepIdx: number,
  backtrackCount: number
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
  { listOfSteps }: VisualisationDataDW,
  currStepIdx: number
): boolean {
  if (currStepIdx === -1) {
    return false;
  }
  for (let i = 0; i <= currStepIdx; i++) {
    const { to, from } = listOfSteps[i];
    if ((to === node1 && from === node2) || (to === node2 && from === node1)) {
      return true;
    }
  }
  return false;
}

function isNodeOnBacktrack(): boolean {
  return false;
}
