import { NodeEdgeGraph } from "../../../visualisationData/typesGraphData";
import { VisualisationDataDirectedWeighted } from "../../../visualisationData/typesVisualisationData";
import { getClassNamesForNodeEdge } from "../scripts/getClassNamesForNodes";
import { NodePostion } from "../scripts/getRandomNodesPostions";

interface NodeEdgeProps {
  visualisationData: VisualisationDataDirectedWeighted;
  currStepIdx: number;
  backtrackCount: number;
  node: NodeEdgeGraph;
  pos: NodePostion;
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
      style={{ left: `${left}%`, top: `${top}%` }}
      className={`absolute  w-12 h-12 rounded-[100%] grid place-content-center -translate-x-1/2 -translate-y-1/2 border-solid border-2 border-gray ${getClassNamesForNodeEdge(
        { visualisationData, currStepIdx, backtrackCount, node }
      )}`}
    ></div>
  );
}

export default NodeEdge;
