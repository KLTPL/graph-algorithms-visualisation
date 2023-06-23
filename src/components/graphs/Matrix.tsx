import { useUserInputData, useVisualisationData } from "../../SettingsContext";
import { VisualisationDataMatrix } from "../../visualisationData/typesVisualisationData";
import { useEffect, useRef, useState } from "react";
import NodeMatrix from "./elements/nodes/NodeMatrix";
import {
  backtrackIfShould,
  resetBacktracking,
} from "./scripts/backtrackMechanick";

export default function Matrix() {
  const visualisationData = useVisualisationData()
    .visualisationData as VisualisationDataMatrix;
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

  function getField(r: number, c: number): JSX.Element {
    return (
      <NodeMatrix
        key={`${r};${c}`}
        visualisationData={visualisationData}
        currStepIdx={currStepIdx}
        backtrackCount={backtrackCount}
        r={r}
        c={c}
      />
    );
  }

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${visualisationData.graph[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${visualisationData.graph.length}, 1fr)`,
      }}
      className="w-[90%] grid max-w-[500px] gap-[1px] bg-gray border-solid border-2 border-gray"
    >
      {visualisationData.graph.map((row, r) =>
        row.map((fieldType, c) => getField(r, c))
      )}
    </div>
  );
}
