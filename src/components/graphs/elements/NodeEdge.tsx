import { NodeEdgeGraph } from "../../../visualisationData/typesGraphData";
import { VisualisationDataDirectedWeighted } from "../../../visualisationData/typesVisualisationData";
import { getClassNamesForNodeEdge } from "../scripts/getClassNamesForNodes";
import { NodePosition } from "../scripts/getDefaultNodesPostions";

export const NODE_SIZE_PX =
  window.innerWidth < 500 ? window.innerWidth / 12 : 40;

interface NodeEdgeProps {
  visualisationData: VisualisationDataDirectedWeighted;
  currStepIdx: number;
  backtrackCount: number;
  node: NodeEdgeGraph;
  pos: NodePosition;
}

function NodeEdge({
  visualisationData,
  currStepIdx,
  backtrackCount,
  node,
  pos,
}: NodeEdgeProps) {
  const { left, top } = pos;
  return (
    <div
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${NODE_SIZE_PX}px`,
        height: `${NODE_SIZE_PX}px`,
      }}
      className={`absolute rounded-[100%] grid place-content-center border-solid border-2 z-50 border-gray ${getClassNamesForNodeEdge(
        { visualisationData, currStepIdx, backtrackCount, node }
      )}`}
    >
      {node}
    </div>
  );
}

export default NodeEdge;
