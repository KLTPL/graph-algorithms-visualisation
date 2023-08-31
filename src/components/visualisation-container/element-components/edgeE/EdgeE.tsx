import {
  useUserInput,
  useVisualisationData,
  useVisualisationPointerTools,
} from "../../../../context/Context";
import { VisualisationDataDW } from "../../../../visualisationData/typesVisualisationData";
import { getProperBgColorForEdgeE } from "./getProperBgColorForEdgeE";
import { NodePosition } from "../../graph-components/E/getProperNodesPostions";
import {
  NodeE,
  ToNodeDW,
  UserGraphTypes,
} from "../../../../visualisationData/typesGraphData";
import { EdgeData } from "../../graph-components/E/getEdges";
import { ChangeEvent } from "react";
import { nodeSizePx } from "../nodeE/NodeE";
import { VisualisationPointerTools } from "../../../visualisation-tools/VisualisationTools";
import removeEdge from "./removeEdge";

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
  const { pointerTool } = useVisualisationPointerTools();
  const { currStepIdx } = useUserInput();
  const { left, top, width, angle } = calcEdgeData(nodePos1, nodePos2);
  const bgColor = getProperBgColorForEdgeE(
    edgeData,
    visualisationData,
    currStepIdx,
    backtrackCount
  );
  const edgeSvgWidth =
    (width / 100) * containerWidth - nodeSizePx < 0
      ? 0
      : (width / 100) * containerWidth - nodeSizePx;
  const isNodesTouching = (width / 100) * containerWidth <= nodeSizePx;

  function handleOnPointerDown() {
    if (pointerTool === VisualisationPointerTools.RemoveEdgeOrNode) {
      removeEdge(visualisationData, edgeData.edge);
      refreshVisualisationData();
    }
  }
  function handleInputOnChange(ev: ChangeEvent) {
    const input = ev.target as HTMLInputElement;
    const [nodeFrom, nodeTo] = edgeData.edge;
    const neighbours = visualisationData.graph[nodeFrom] as ToNodeDW[];
    neighbours.filter(toNode => nodeTo === toNode.node)[0].cost = parseInt(
      input.value
    );
    // update both sides of edge if graph is UW
    if (visualisationData.graphType === UserGraphTypes.UW) {
      const neighbours = visualisationData.graph[nodeTo] as ToNodeDW[];
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
        transform: `translate(${nodeSizePx / 2}px, ${
          nodeSizePx / 2 - EDGE_HEIGHT_PX / 2
        }px) rotate(${angle}deg)`,
        display: isNodesTouching ? "none" : "block",
      }}
      className="absolute"
    >
      <div
        onPointerDown={handleOnPointerDown}
        className="absolute left-0 top-0 bottom-0 right-0"
      >
        {visualisationData.isDOrDW ? (
          <svg
            style={{
              transform: `translate(${nodeSizePx / 2}px, -50%)`,
              fill: bgColor,
              visibility: visualisationData.isDOrDW ? "visible" : "hidden",
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 150"
            width={edgeSvgWidth}
            height={EDGE_HEIGHT_PX * 8}
            preserveAspectRatio="none"
          >
            <path
              fillOpacity="1"
              d="M 4 70 Q 308 0 598 80 L 551 106 L 575 40 L 597 80 L 583 83 Q 307 15 4 84 Z"
            ></path>
          </svg>
        ) : (
          <div
            style={{
              backgroundColor: `${bgColor}`,
            }}
            className="w-full h-full"
          ></div>
        )}
      </div>
      {visualisationData.isDWOrUW && (
        <input
          key={JSON.stringify(edgeData)} // key is necesary when removing en edge
          type="number"
          defaultValue={edgeData.cost}
          className="absolute left-1/2 top-1/2 max-w-[4ch] w-fit bg-nodeEmpty text-center border-2 border-nodeBorder rounded-full flex justify-center items-center"
          style={{
            transform: `translate(-50%, ${
              visualisationData.isDOrDW ? "-125" : "-50"
            }%) rotate(${-angle}deg)`,
            fontSize: nodeSizePx / 2,
          }}
          onChange={handleInputOnChange}
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
