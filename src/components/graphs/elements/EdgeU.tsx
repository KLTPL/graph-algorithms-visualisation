import {
  useUserInputData,
  useVisualisationData,
} from "../../../SettingsContext";
import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import getBasicStylesForEdgeE from "../scripts/getStylesObjForEdgeE";
import { getClassNamesForEdgeU } from "../scripts/getClassNamesForEdgeE";
import { NodePosition } from "../scripts/getProperNodesPostions";
import {
  ToNodeDW,
  UserGraphTypes,
} from "../../../visualisationData/typesGraphData";
import { EdgeData } from "../scripts/getEdges";
import { ChangeEvent } from "react";

interface EdgeUndirectedProps {
  nodePos1: NodePosition;
  nodePos2: NodePosition;
  edgeData: EdgeData;
  backtrackCount: number;
}

function EdgeUndirected({
  nodePos1,
  nodePos2,
  edgeData,
  backtrackCount,
}: EdgeUndirectedProps) {
  const { visualisationData: visualisationDataAny, refreshVisualisationData } =
    useVisualisationData();
  const visualisationData = visualisationDataAny as VisualisationDataDW;
  const { currStepIdx } = useUserInputData();
  const isWeighted =
    visualisationData.graphType === UserGraphTypes.DW ||
    visualisationData.graphType === UserGraphTypes.UW;
  const edgeStylesData = calcEdgeData(nodePos1, nodePos2);
  const stylesObj = getBasicStylesForEdgeE(edgeStylesData);
  const classNames = getClassNamesForEdgeU(
    edgeData,
    visualisationData,
    currStepIdx,
    backtrackCount
  );

  function handleOnChange(ev: ChangeEvent) {
    const input = ev.target as HTMLInputElement;
    const [nodeFrom, nodeTo] = edgeData.edge;
    const neighbours = visualisationData.graph.get(nodeFrom) as ToNodeDW[];
    neighbours.filter(toNode => nodeTo === toNode.node)[0].cost = parseInt(input.value);
    refreshVisualisationData();
  }

  return (
    <div style={stylesObj} className={classNames}>
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
  const angle = Math.atan(distY / distX) * (180 / Math.PI);
  const width = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
  const { left, top } = nodePos1.left < nodePos2.left ? nodePos1 : nodePos2;
  return {
    angle,
    width,
    left,
    top,
  };
}

export default EdgeUndirected;
