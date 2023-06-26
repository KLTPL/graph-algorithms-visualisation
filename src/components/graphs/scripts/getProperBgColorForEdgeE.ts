import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import { EdgeData } from "./getEdges";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwind-config';

const twConfig = resolveConfig(tailwindConfig);

export function getProperBgColorForEdgeE(
  edge: EdgeData,
  visualisationData: VisualisationDataDW,
  currStepIdx: number,
  backtrackCount: number
): string {
  const isVisited = isEdgeVisited(edge, visualisationData, currStepIdx);
  const isOnBacktrack = isNodeOnBacktrack(
    edge,
    visualisationData,
    backtrackCount
  );
  if (isOnBacktrack) {
    return twConfig.theme.colors.nodeBacktrack;
  }
  if (isVisited) {
    return twConfig.theme.colors.primary;
  }
  return twConfig.theme.colors.black;
}

function isEdgeVisited(
  edgeData: EdgeData,
  { listOfSteps }: VisualisationDataDW,
  currStepIdx: number
): boolean {
  const [node1, node2] = edgeData.edge;
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

function isNodeOnBacktrack(
  edgeData: EdgeData,
  visualisationData: VisualisationDataDW,
  backtrackCount: number
): boolean {
  // after finding the end node algorithm backtracks to show visualisationData.pathToEndNode
  // backtrackCount is the count of how many nodes did the visualisation go back
  const [node1, node2] = edgeData.edge;
  if (visualisationData.pathToEndNode === null) {
    return false;
  }
  const path = [
    visualisationData.startNode,
    ...visualisationData.pathToEndNode,
  ];
  for (let i = 1; i < backtrackCount; i++) {
    const newNode1 = path.at(-i);
    const newNode2 = path.at(-(i + 1));
    if (
      (newNode1 === node1 && newNode2 === node2) ||
      (newNode1 === node2 && newNode2 === node1)
    ) {
      return true;
    }
  }
  return false;
}
