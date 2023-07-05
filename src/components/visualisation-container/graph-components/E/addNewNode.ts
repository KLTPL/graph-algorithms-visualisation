import { VisualisationDataDW } from "../../../../visualisationData/typesVisualisationData";
import { nodeSizePx } from "../../element-components/nodeE/NodeE";
import getProperNodesPosition from "./getProperNodesPostions";

export default function addNewNode(
  containerDiv: HTMLDivElement,
  { clientX, clientY }: React.PointerEvent,
  visualisationData: VisualisationDataDW
) {
  const { left, top, right, width, height, bottom } =
    containerDiv.getBoundingClientRect();
  let newLeft = ((clientX - left - nodeSizePx / 2) / width) * 100;
  let newTop = ((clientY - top - nodeSizePx / 2) / height) * 100;
  if (clientX - nodeSizePx / 2 <= left) {
    newLeft = 0;
  }
  if (clientX + nodeSizePx / 2 >= right) {
    newLeft = 100 - (nodeSizePx / width) * 100;
  }
  if (clientY - nodeSizePx / 2 <= top) {
    newTop = 0;
  }
  if (clientY + nodeSizePx / 2 >= bottom) {
    newTop = 100 - (nodeSizePx / height) * 100;
  }
  visualisationData.graph.push([]);
  getProperNodesPosition(visualisationData).push({
    left: newLeft,
    top: newTop,
  });
}
