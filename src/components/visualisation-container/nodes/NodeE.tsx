import {
  useUserInput,
  useVisualisationData,
  useVisualisationPointerTools,
} from "../../../context/Context";
import { NodeE } from "../../../visualisationData/typesGraphData";
import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import { VisualisationPointerTools } from "../../visualisation-tools/VisualisationTools";
import { getClassNamesForNodeE } from "../scripts/getClassNamesForNodeEAndM";
import { NodePosition } from "../scripts/getProperNodesPostions";

export const NODE_SIZE_PX =
  window.innerWidth < 500 ? window.innerWidth / 12 : 40;

interface NodeEdgeProps {
  backtrackCount: number;
  node: NodeE;
  pos: NodePosition;
  containerRef: React.RefObject<HTMLDivElement>;
}

function NodeEdge({ backtrackCount, node, pos, containerRef }: NodeEdgeProps) {
  const { visualisationData: AnyVisualisationData, refreshVisualisationData } =
    useVisualisationData();
  const visualisationData = AnyVisualisationData as VisualisationDataDW;
  const { pointerTool } = useVisualisationPointerTools();
  const { currStepIdx } = useUserInput();
  const { left, top } = pos;
  const className = getClassNamesForNodeE({
    visualisationData,
    currStepIdx,
    backtrackCount,
    node,
  });

  function handleOnPointerDown(): void {
    switch (pointerTool) {
      case VisualisationPointerTools.NoTool:
        document.body.style.touchAction = "none";
        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", () => {
          document.body.style.touchAction = "auto";
          document.removeEventListener("pointermove", handlePointerMove);
        });
        break;
      case VisualisationPointerTools.NewNode:
        break;
      case VisualisationPointerTools.NewEdge:
        break;
      case VisualisationPointerTools.RemoveEdgeOrNode:
        break;
    }
  }
  function handlePointerMove(ev: PointerEvent): void {
    ev.preventDefault();
    const { left, top, right, bottom, width, height } = (
      containerRef.current as HTMLDivElement
    ).getBoundingClientRect();
    const { clientX, clientY } = ev;
    const newLeft = ((clientX - left - NODE_SIZE_PX / 2) / width) * 100;
    const newRight = ((clientY - top - NODE_SIZE_PX / 2) / height) * 100;
    if (
      clientX - NODE_SIZE_PX / 2 > left &&
      clientX + NODE_SIZE_PX / 2 < right
    ) {
      pos.left = newLeft;
    }
    if (
      clientY - NODE_SIZE_PX / 2 > top &&
      clientY + NODE_SIZE_PX / 2 < bottom
    ) {
      pos.top = newRight;
    }
    refreshVisualisationData();
  }
  return (
    <div
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${NODE_SIZE_PX}px`,
        height: `${NODE_SIZE_PX}px`,
      }}
      className={className}
      onPointerDown={handleOnPointerDown}
    >
      {String.fromCharCode(node + "a".charCodeAt(0))}
    </div>
  );
}

export default NodeEdge;
