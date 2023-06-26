import {
  useUserInputData,
  useVisualisationData,
} from "../../../SettingsContext";
import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import getBasicStylesForEdgeE from "../scripts/getStylesObjForEdgeE";
import { getProperBgColorForEdgeE } from "../scripts/getProperBgColorForEdgeE";
import { NodePosition } from "../scripts/getProperNodesPostions";
import {
  ToNodeDW,
  UserGraphTypes,
} from "../../../visualisationData/typesGraphData";
import { EdgeData } from "../scripts/getEdges";
import { ChangeEvent } from "react";
import { NODE_SIZE_PX } from "./NodeE";

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
  const { currStepIdx } = useUserInputData();
  const isWeighted =
    visualisationData.graphType === UserGraphTypes.DW ||
    visualisationData.graphType === UserGraphTypes.UW;
  const isDirected =
    visualisationData.graphType === UserGraphTypes.D ||
    visualisationData.graphType === UserGraphTypes.DW;
  const edgeStylesData = calcEdgeData(nodePos1, nodePos2);
  const stylesObj = getBasicStylesForEdgeE(edgeStylesData);
  const bgColor = getProperBgColorForEdgeE(
    edgeData,
    visualisationData,
    currStepIdx,
    backtrackCount
  );
  const edgeSvgWidth =
    containerWidth === 0
      ? 0
      : (edgeStylesData.width / 100) * containerWidth - NODE_SIZE_PX;
  function handleOnChange(ev: ChangeEvent) {
    const input = ev.target as HTMLInputElement;
    const [nodeFrom, nodeTo] = edgeData.edge;
    const neighbours = visualisationData.graph.get(nodeFrom) as ToNodeDW[];
    neighbours.filter(toNode => nodeTo === toNode.node)[0].cost = parseInt(
      input.value
    );
    refreshVisualisationData();
  }
  return (
    <div
      style={{ ...stylesObj, backgroundColor: `${!isDirected ? bgColor : ""}` }}
      className="h-1 absolute"
    >
      {isDirected && (
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
      {isWeighted && (
        <input
          type="number"
          defaultValue={edgeData.cost}
          className="absolute left-1/2 top-1/2 max-w-[4ch] bg-marixGraphFieldEmpty text-center border-2 border-nodeDefault rounded-full"
          style={{
            transform: `translate(-50%, -50%) rotate(${-edgeStylesData.angle}deg)`,
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
