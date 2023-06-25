import {
  useUserInputData,
  useVisualisationData,
} from "../../../SettingsContext";
import { NodeE } from "../../../visualisationData/typesGraphData";
import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import { getClassNamesForNodeE } from "../scripts/getClassNamesForNodeE";
import { NodePosition } from "../scripts/getProperNodesPostions";

export const NODE_SIZE_PX =
  window.innerWidth < 500 ? window.innerWidth / 12 : 40;

interface NodeEdgeProps {
  backtrackCount: number;
  node: NodeE;
  pos: NodePosition;
}

function NodeEdge({ backtrackCount, node, pos }: NodeEdgeProps) {
  const visualisationData = useVisualisationData()
    .visualisationData as VisualisationDataDW;
  const { currStepIdx } = useUserInputData();
  const { left, top } = pos;
  const className = getClassNamesForNodeE({
    visualisationData,
    currStepIdx,
    backtrackCount,
    node,
  });
  return (
    <div
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${NODE_SIZE_PX}px`,
        height: `${NODE_SIZE_PX}px`,
      }}
      className={className}
    >
      {node}
    </div>
  );
}

export default NodeEdge;
