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
  console.log(visualisationData.startNode);
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
    switch (pointerTool) {
      case VisualisationPointerToolsM.EmptyField:
        visualisationData.graph[r][c] = NodeTypesM.empty;
        break;
      case VisualisationPointerToolsM.RockField:
        visualisationData.graph[r][c] = NodeTypesM.rock;
        break;
      case VisualisationPointerToolsM.StartField:
        visualisationData.startNode.x = c;
        visualisationData.startNode.y = r;
        break;
      case VisualisationPointerToolsM.EndField:
        visualisationData.endNode.x = c;
        visualisationData.endNode.y = r;
        break;
    }
    if (pointerTool !== VisualisationPointerToolsM.NoTool) {
      refreshVisualisationData();
    }
  }

  return <div className={className} onPointerDown={handleOnPointerDown} />;
}

export default NodeMatrix;
