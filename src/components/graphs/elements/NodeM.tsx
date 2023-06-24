import { VisualisationDataM } from "../../../visualisationData/typesVisualisationData";
import { getClassNamesForNodeM } from "../scripts/getClassNamesForNodeE";

type NodeMatrixProps = {
  visualisationData: VisualisationDataM;
  currStepIdx: number;
  backtrackCount: number;
  r: number;
  c: number;
};

function NodeMatrix(props: NodeMatrixProps) {
  const className = getClassNamesForNodeM(props);
  return (
    <div className={`aspect-square grid place-content-center ${className}`} />
  );
}

export default NodeMatrix;
