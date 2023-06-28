import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import { NODE_SIZE_PX } from "../nodes/NodeE";
import getProperNodesPosition, { NodePosition } from "./getProperNodesPostions";

export default function addNewNode(
  containerDiv: HTMLDivElement,
  { clientX, clientY }: React.PointerEvent,
  visualisationData: VisualisationDataDW,
  refreshVisualisationData: () => void
) {
  const { left, top, right, width, height, bottom } =
    containerDiv.getBoundingClientRect();
  let newLeft = ((clientX - left - NODE_SIZE_PX / 2) / width) * 100;
  let newTop = ((clientY - top - NODE_SIZE_PX / 2) / height) * 100;
  if (clientX - NODE_SIZE_PX / 2 <= left) {
    newLeft = 0;
  }
  if (clientX + NODE_SIZE_PX / 2 >= right) {
    newLeft = 100 - (NODE_SIZE_PX / width) * 100;
  }
  if (clientY - NODE_SIZE_PX / 2 <= top) {
    newTop = 0;
  }
  if (clientY + NODE_SIZE_PX / 2 >= bottom) {
    newTop = 100 - (NODE_SIZE_PX / height) * 100;
  }
  visualisationData.graph.push([]);
  getProperNodesPosition(visualisationData).push({
    left: newLeft,
    top: newTop,
  });
  refreshVisualisationData();
}
