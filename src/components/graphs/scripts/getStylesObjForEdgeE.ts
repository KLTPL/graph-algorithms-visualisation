import { EdgeData } from "../elements/EdgeU";
import { NODE_SIZE_PX } from "../elements/NodeE";

const EDGE_HEIGHT_PX = 4;

function getBasicStylesForEdgeE({ angle, width, left, top }: EdgeData) {
  return {
    transformOrigin: "left",
    height: `${EDGE_HEIGHT_PX}px`,
    width: `${width}%`,
    left: `${left}%`,
    top: `${top}%`,
    transform: `translate(${NODE_SIZE_PX / 2}px, ${
      NODE_SIZE_PX / 2 - EDGE_HEIGHT_PX / 2
    }px) rotate(${angle}deg)`,
  };
}

export default getBasicStylesForEdgeE;
