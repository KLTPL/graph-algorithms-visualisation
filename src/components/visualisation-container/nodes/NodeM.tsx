import { useUserInput, useVisualisationData } from "../../../context/Context";
import { VisualisationDataM } from "../../../visualisationData/typesVisualisationData";
import { getClassNamesForNodeM } from "../scripts/getClassNamesForNodeE";

type NodeMatrixProps = {
  backtrackCount: number;
  r: number;
  c: number;
};

function NodeMatrix({ backtrackCount, r, c }: NodeMatrixProps) {
  const visualisationData = useVisualisationData()
    .visualisationData as VisualisationDataM;
  const { currStepIdx } = useUserInput();
  const className = getClassNamesForNodeM({
    visualisationData,
    currStepIdx,
    backtrackCount,
    r,
    c,
  });
  return <div className={className} />;
}

export default NodeMatrix;
