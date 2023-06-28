import { NodeE } from "../../../visualisationData/typesGraphData";
import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import getProperNodesPosition from "./getProperNodesPostions";

export default function removeNode(
  visualisationData: VisualisationDataDW,
  node: NodeE,
) {
  visualisationData.graph.splice(node, 1);
  getProperNodesPosition(visualisationData).splice(node, 1);
  changeStartAndEndNodeIfNeeded(visualisationData, node);
  for (const neighbours of visualisationData.graph) {
    for (let i = 0; i < neighbours.length; i++) {
      if (neighbours[i].node === node) {
        neighbours.splice(i, 1);
        i--;
        continue;
      }
      if (neighbours[i].node > node) {
        neighbours[i].node--;
      }
    }
  }
}

function changeStartAndEndNodeIfNeeded(
  { startNode, endNode }: VisualisationDataDW,
  nodeToRemove: NodeE
) {
  if (startNode.current >= nodeToRemove && startNode.current > 0) {
    startNode.current--;
  }
  if (endNode.current >= nodeToRemove && endNode.current > 0) {
    endNode.current--;
  }
  if (startNode.current === endNode.current) {
    if (startNode.current === 0) {
      startNode.current++;
    } else {
      startNode.current--;
    }
  }
}
