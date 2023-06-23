import { VisualisationDataMatrix } from "../../../visualisationData/typesVisualisationData";
import { getClassNamesForNodeMatrix } from "../scripts/getClassNamesForNodes";

type NodeMatrixProps = {
  visualisationData: VisualisationDataMatrix;
  currStepIdx: number;
  backtrackCount: number;
  r: number;
  c: number;
};

function NodeMatrix(props: NodeMatrixProps) {
  const className = getClassNamesForNodeMatrix(props);
  return (
    <div className={`aspect-square grid place-content-center ${className}`} />
  );
}

export default NodeMatrix;
