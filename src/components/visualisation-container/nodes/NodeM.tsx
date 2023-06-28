import {
  useUserInput,
  useVisualisationData,
  useVisualisationPointerTools,
} from "../../../context/Context";
import { NodeTypesM } from "../../../visualisationData/typesGraphData";
import { VisualisationDataM } from "../../../visualisationData/typesVisualisationData";
import { VisualisationPointerTools } from "../../visualisation-tools/VisualisationTools";
import { getClassNamesForNodeM } from "../scripts/getClassNamesForNodeEAndM";

type NodeMatrixProps = {
  backtrackCount: number;
  r: number;
  c: number;
};

function NodeMatrix({ backtrackCount, r, c }: NodeMatrixProps) {
  const { visualisationData: AnyVisualisationData, refreshVisualisationData } =
    useVisualisationData();
  const visualisationData = AnyVisualisationData as VisualisationDataM;
  const pointerTool = useVisualisationPointerTools()
    .pointerTool as VisualisationPointerTools;
  const { currStepIdx } = useUserInput();
  const className = getClassNamesForNodeM({
    visualisationData,
    currStepIdx,
    backtrackCount,
    r,
    c,
  });
  function handleOnPointerDown(): void {
    const { graph, startNode, endNode } = visualisationData;
    switch (pointerTool) {
      case VisualisationPointerTools.EmptyField:
        graph[r][c] = NodeTypesM.empty;
        break;
      case VisualisationPointerTools.RockField:
        if (
          r !== startNode.y ||
          r !== endNode.y ||
          c !== startNode.x ||
          c !== endNode.x
        ) {
          graph[r][c] = NodeTypesM.rock;
        }
        break;
      case VisualisationPointerTools.StartField:
        startNode.x = c;
        startNode.y = r;
        graph[r][c] = NodeTypesM.empty;
        break;
      case VisualisationPointerTools.EndField:
        endNode.x = c;
        endNode.y = r;
        graph[r][c] = NodeTypesM.empty;
        break;
    }
    if (pointerTool !== VisualisationPointerTools.NoTool) {
      refreshVisualisationData();
    }
  }

  return <div className={className} onPointerDown={handleOnPointerDown} />;
}

export default NodeMatrix;
