import {
  useUserInputData,
  useVisualisationData,
} from "../../../SettingsContext";
import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import getBasicStylesForEdgeE from "../scripts/getStylesObjForEdgeE";
import { getClassNamesForEdgeU } from "../scripts/getClassNamesForEdgeE";
import { NodePosition } from "../scripts/getProperNodesPostions";
import { Edge } from "../scripts/getEdges";

interface EdgeUndirectedProps {
  nodePos1: NodePosition;
  nodePos2: NodePosition;
  edge: Edge;
  backtrackCount: number;
}

function EdgeUndirected({
  nodePos1,
  nodePos2,
  edge,
  backtrackCount,
}: EdgeUndirectedProps) {
  const visualisationData = useVisualisationData()
    .visualisationData as VisualisationDataDW;
  const { currStepIdx } = useUserInputData();

  const stylesObj = getBasicStylesForEdgeE(nodePos1, nodePos2);
  const classNames = getClassNamesForEdgeU(
    edge,
    visualisationData,
    currStepIdx,
    backtrackCount
  );

  return <div style={stylesObj} className={classNames} />;
}

export default EdgeUndirected;
