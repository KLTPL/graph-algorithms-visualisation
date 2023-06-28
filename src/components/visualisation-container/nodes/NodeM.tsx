import {
  useUserInput,
  useVisualisationData,
  useVisualisationPointerTools,
} from "../../../context/Context";
import { NodeTypesM } from "../../../visualisationData/typesGraphData";
import { VisualisationDataM } from "../../../visualisationData/typesVisualisationData";
import { VisualisationPointerToolsM } from "../../visualisation-tools/VisualisationTools";
import { getClassNamesForNodeM } from "../scripts/getClassNamesForNodeE";

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
    .pointerTool as VisualisationPointerToolsM;
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
      case VisualisationPointerToolsM.EmptyField:
        graph[r][c] = NodeTypesM.empty;
        break;
      case VisualisationPointerToolsM.RockField:
        if (
          r !== startNode.y ||
          r !== endNode.y ||
          c !== startNode.x ||
          c !== endNode.x
        ) {
          graph[r][c] = NodeTypesM.rock;
        }
        break;
      case VisualisationPointerToolsM.StartField:
        startNode.x = c;
        startNode.y = r;
        graph[r][c] = NodeTypesM.empty;
        break;
      case VisualisationPointerToolsM.EndField:
        endNode.x = c;
        endNode.y = r;
        graph[r][c] = NodeTypesM.empty;
        break;
    }
    if (pointerTool !== VisualisationPointerToolsM.NoTool) {
      refreshVisualisationData();
    }
  }

  return <div className={className} onPointerDown={handleOnPointerDown} />;
}

export default NodeMatrix;
