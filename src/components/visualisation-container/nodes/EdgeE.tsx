import { useUserInput, useVisualisationData } from "../../../context/Context";
import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import { getProperBgColorForEdgeE } from "../scripts/getProperBgColorForEdgeE";
import { NodePosition } from "../scripts/getProperNodesPostions";
import {
  ToNodeDW,
  UserGraphTypes,
} from "../../../visualisationData/typesGraphData";
import { EdgeData } from "../scripts/getEdges";
import { ChangeEvent } from "react";
import { NODE_SIZE_PX } from "./NodeE";

export const EDGE_HEIGHT_PX = 4;

interface EdgeEdgeProps {
  nodePos1: NodePosition;
  nodePos2: NodePosition;
  edgeData: EdgeData;
  backtrackCount: number;
  containerWidth: number;
}

function EdgeEdge({
  nodePos1,
  nodePos2,
  edgeData,
  backtrackCount,
  containerWidth,
}: EdgeEdgeProps) {
  const { visualisationData: visualisationDataAny, refreshVisualisationData } =
    useVisualisationData();
  const visualisationData = visualisationDataAny as VisualisationDataDW;
  const { currStepIdx } = useUserInput();
  const { left, top, width, angle } = calcEdgeData(nodePos1, nodePos2);
  const bgColor = getProperBgColorForEdgeE(
    edgeData,
    visualisationData,
    currStepIdx,
    backtrackCount
  );
  const edgeSvgWidth =
    (width / 100) * containerWidth - NODE_SIZE_PX < 0
      ? 0
      : (width / 100) * containerWidth - NODE_SIZE_PX;
  const isNodesTouching = (width / 100) * containerWidth <= NODE_SIZE_PX;

  function handleOnChange(ev: ChangeEvent) {
    const input = ev.target as HTMLInputElement;
    const [nodeFrom, nodeTo] = edgeData.edge;
    const neighbours = visualisationData.graph.get(nodeFrom) as ToNodeDW[];
    neighbours.filter(toNode => nodeTo === toNode.node)[0].cost = parseInt(
      input.value
    );
    // update both sides of edge if graph is UW
    if (visualisationData.graphType === UserGraphTypes.UW) {
      const neighbours = visualisationData.graph.get(nodeTo) as ToNodeDW[];
      neighbours.filter(toNode => nodeFrom === toNode.node)[0].cost = parseInt(
        input.value
      );
    }
    refreshVisualisationData();
  }
  return (
    <div
      style={{
        transformOrigin: "left",
        height: `${EDGE_HEIGHT_PX}px`,
        width: `${width}%`,
        left: `${left}%`,
        top: `${top}%`,
        transform: `translate(${NODE_SIZE_PX / 2}px, ${
          NODE_SIZE_PX / 2 - EDGE_HEIGHT_PX / 2
        }px) rotate(${angle}deg)`,
        backgroundColor: `${!visualisationData.isDOrDW ? bgColor : ""}`,
        display: isNodesTouching ? "none" : "block",
      }}
      className="h-1 absolute"
    >
      {visualisationData.isDOrDW && (
        <svg
          style={{
            transform: `translate(${NODE_SIZE_PX / 2}px, -50%)`,
            fill: bgColor,
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 150"
          width={edgeSvgWidth}
          height={35}
          preserveAspectRatio="none"
        >
          <path
            fillOpacity="1"
            d="M 4 70 Q 308 0 598 80 L 551 106 L 575 40 L 597 80 L 583 83 Q 307 15 4 84 Z"
          ></path>
        </svg>
      )}
      {visualisationData.isDWOrUW && (
        <input
          type="number"
          defaultValue={edgeData.cost}
          className="absolute left-1/2 top-1/2 max-w-[4ch] bg-nodeEmpty text-center border-2 border-nodeBorder rounded-full"
          style={{
            transform: `translate(-50%, ${
              visualisationData.isDOrDW ? "-125" : "-50"
            }%) rotate(${-angle}deg)`,
          }}
          onChange={handleOnChange}
        />
      )}
    </div>
  );
}

export interface EdgeStylesData {
  angle: number;
  width: number;
  left: number;
  top: number;
}

function calcEdgeData(
  nodePos1: NodePosition,
  nodePos2: NodePosition
): EdgeStylesData {
  const distX = nodePos1.left - nodePos2.left;
  const distY = nodePos1.top - nodePos2.top;
  let angle = Math.atan(distY / distX) * (180 / Math.PI);
  if (distX >= 0) {
    angle += 180;
  }
  const width = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
  const { left, top } = nodePos1;
  return {
    angle,
    width,
    left,
    top,
  };
}

export default EdgeEdge;
