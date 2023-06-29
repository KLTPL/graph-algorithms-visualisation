import { useEffect, useState } from "react";
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
import removeNode from "../scripts/removeNode";

export const nodeSizePx = window.innerWidth < 500 ? window.innerWidth / 12 : 40;

interface NodeEdgeProps {
  backtrackCount: number;
  node: NodeE;
  pos: NodePosition;
  containerRef: React.RefObject<HTMLDivElement>;
  newEdgeNode1Ref: React.MutableRefObject<number | null>;
}

function NodeEdge({
  backtrackCount,
  node,
  pos,
  containerRef,
  newEdgeNode1Ref,
}: NodeEdgeProps) {
  const { visualisationData: AnyVisualisationData, refreshVisualisationData } =
    useVisualisationData();
  const visualisationData = AnyVisualisationData as VisualisationDataDW;
  const { pointerTool } = useVisualisationPointerTools();
  const { currStepIdx } = useUserInput();
  const { left, top } = pos;
  const [isNode1InNewEdge, setIsNode1InNewEdge] = useState<boolean>(false);
  const className = getClassNamesForNodeE({
    visualisationData,
    currStepIdx,
    backtrackCount,
    node,
    isNode1InNewEdge,
  });

  useEffect(() => {
    if (isNode1InNewEdge && newEdgeNode1Ref.current === null) {
      setIsNode1InNewEdge(false);
    }
  }, [newEdgeNode1Ref.current]);

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
      case VisualisationPointerTools.RemoveEdgeOrNode:
        if (visualisationData.graph.length > 2) {
          removeNode(visualisationData, node);
          refreshVisualisationData();
        }
        break;
      case VisualisationPointerTools.NewEdge:
        if (newEdgeNode1Ref.current === null) {
          newEdgeNode1Ref.current = node;
          setIsNode1InNewEdge(true);
        } else if (newEdgeNode1Ref.current === node) {
          setIsNode1InNewEdge(false);
          newEdgeNode1Ref.current = null;
        } else {
          visualisationData.graph[newEdgeNode1Ref.current].push({
            node,
            cost: 1,
          });
          if (visualisationData.isUOrUW) {
            visualisationData.graph[node].push({
              node: newEdgeNode1Ref.current,
              cost: 1,
            });
          }
          newEdgeNode1Ref.current = null;
          refreshVisualisationData();
        }
        break;
    }
  }
  function handlePointerMove(ev: PointerEvent): void {
    ev.preventDefault();
    const { left, top, right, bottom, width, height } = (
      containerRef.current as HTMLDivElement
    ).getBoundingClientRect();
    const { clientX, clientY } = ev;
    const newLeft = ((clientX - left - nodeSizePx / 2) / width) * 100;
    const newRight = ((clientY - top - nodeSizePx / 2) / height) * 100;
    if (clientX - nodeSizePx / 2 > left && clientX + nodeSizePx / 2 < right) {
      pos.left = newLeft;
    }
    if (clientY - nodeSizePx / 2 > top && clientY + nodeSizePx / 2 < bottom) {
      pos.top = newRight;
    }
    refreshVisualisationData();
  }
  return (
    <div
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${nodeSizePx}px`,
        height: `${nodeSizePx}px`,
      }}
      className={className}
      onPointerDown={handleOnPointerDown}
    >
      {pointerTool === VisualisationPointerTools.NewEdge
        ? "Click"
        : String.fromCharCode(node + "a".charCodeAt(0))}
    </div>
  );
}

export default NodeEdge;
