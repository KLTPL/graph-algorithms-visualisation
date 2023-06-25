import {
  useUserInputData,
  useVisualisationData,
} from "../../../SettingsContext";
import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import getBasicStylesForEdgeE from "../scripts/getStylesObjForEdgeE";
import { getClassNamesForEdgeU } from "../scripts/getClassNamesForEdgeE";
import { NodePosition } from "../scripts/getProperNodesPostions";
import { Edge } from "../scripts/getEdges";
import { UserGraphTypes } from "../../../visualisationData/typesGraphData";

interface EdgeUndirectedProps {
  nodePos1: NodePosition;
  nodePos2: NodePosition;
  edge: Edge;
  backtrackCount: number;
}

function EdgeUndirected({
  nodePos1,
  nodePos2,
  edge,
  backtrackCount,
}: EdgeUndirectedProps) {
  const visualisationData = useVisualisationData()
    .visualisationData as VisualisationDataDW;
  const { currStepIdx } = useUserInputData();

  const isWeighted =
    visualisationData.graphType === UserGraphTypes.DW ||
    visualisationData.graphType === UserGraphTypes.UW;
  const edgeData = calcEdgeData(nodePos1, nodePos2);
  const stylesObj = getBasicStylesForEdgeE(edgeData);
  const classNames = getClassNamesForEdgeU(
    edge,
    visualisationData,
    currStepIdx,
    backtrackCount
  );

  return (
    <div style={stylesObj} className={classNames}>
      {isWeighted && (
        <input
          type="number"
          defaultValue={1}
          className="absolute left-1/2 top-1/2 max-w-[4ch] bg-marixGraphFieldEmpty text-center border-2 border-nodeDefault rounded-full"
          style={{
            transform: `translate(-50%, -50%) rotate(${-edgeData.angle}deg)`,
          }}
        />
      )}
    </div>
  );
}

export interface EdgeData {
  angle: number;
  width: number;
  left: number;
  top: number;
}

function calcEdgeData(
  nodePos1: NodePosition,
  nodePos2: NodePosition
): EdgeData {
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
