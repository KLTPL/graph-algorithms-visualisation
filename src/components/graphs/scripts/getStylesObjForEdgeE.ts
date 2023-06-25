import { NODE_SIZE_PX } from "../elements/NodeE";
import { NodePosition } from "./getProperNodesPostions";

const EDGE_HEIGHT_PX = 4;

function getBasicStylesForEdgeE(
  nodePos1: NodePosition,
  nodePos2: NodePosition
) {
  const distX = nodePos1.left - nodePos2.left;
  const distY = nodePos1.top - nodePos2.top;
  const angle = Math.atan(distY / distX) * (180 / Math.PI);
  const dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
  const { left, top } = nodePos1.left < nodePos2.left ? nodePos1 : nodePos2;
  return {
    transformOrigin: "left",
    height: `${EDGE_HEIGHT_PX}px`,
    width: `${dist}%`,
    left: `${left}%`,
    top: `${top}%`,
    transform: `translate(${NODE_SIZE_PX / 2}px, ${
      NODE_SIZE_PX / 2 - EDGE_HEIGHT_PX / 2
    }px) rotate(${angle}deg)`,
  };
}

export default getBasicStylesForEdgeE;
