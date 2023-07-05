import {
  useVisualisationData,
} from "../../../../context/Context";
import { VisualisationDataM } from "../../../../visualisationData/typesVisualisationData";
import NodeMatrix from "../../element-components/nodeM/NodeM";

export default function Matrix({ backtrackCount }: { backtrackCount: number }) {
  const visualisationData = useVisualisationData()
    .visualisationData as VisualisationDataM;


  function getField(r: number, c: number): JSX.Element {
    return (
      <NodeMatrix
        key={`${r};${c}`}
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
      className="w-[90%] grid max-w-[500px] gap-[1px] bg-nodeBorder border-solid border-2 border-nodeBorder"
    >
      {visualisationData.graph.map((row, r) =>
        row.map((fieldType, c) => getField(r, c))
      )}
    </div>
  );
}
