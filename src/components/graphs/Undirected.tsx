import { useEffect, useRef, useState } from "react";
import { useUserInputData, useVisualisationData } from "../../SettingsContext";
import { VisualisationDataDirectedWeighted } from "../../visualisationData/typesVisualisationData";
import NodeEdge from "./elements/nodes/NodeEdge";
import {
  backtrackIfShould,
  resetBacktracking,
} from "./scripts/backtrackMechanick";

export default function Undirected() {
  const visualisationData = useVisualisationData()
    .visualisationData as VisualisationDataDirectedWeighted;
  const { currStepIdx } = useUserInputData();
  const isBacktracking = useRef<boolean>(false);
  const [backtrackCount, setBacktrackCount] = useState<number>(0);
  // after finding the end node algorithm backtracks to show visualisationData.pathToEndNode
  // backtrackCount is the count of how many nodes did the visualisation go back

  useEffect(
    () => resetBacktracking(isBacktracking, setBacktrackCount),
    [visualisationData.algorithmType, visualisationData.graphType, currStepIdx]
  );

  useEffect(() => {
    backtrackIfShould(
      visualisationData,
      isBacktracking,
      currStepIdx,
      setBacktrackCount
    );
  });

  function getNode(): JSX.Element {
    return <NodeEdge />;
  }

  return (
    <div>
      <NodeEdge />
    </div>
  );
}
