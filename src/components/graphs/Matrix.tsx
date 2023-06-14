import { FieldTypesMatrixGraph, GraphDataMatrix } from "../../visualisationData/graphDataSets/allGraphData";
import { GraphComponentMatrixProps } from "../GraphContainer";

export default function Matrix({ visualisationData }: GraphComponentMatrixProps) {
  const { graphData } = visualisationData;
  function getField(r: number, c: number): JSX.Element {
    return (
      <Field 
        key={`${r};${c}`} 
        className={getColorClassNamesForField(graphData, r, c)} 
      />
    );
  }

  return (
    <div 
      style={{ gridTemplateColumns: `repeat(${graphData.graph[0].length}, 1fr)`, gridTemplateRows: `repeat(${graphData.graph.length}, 1fr)` }}
      className={`w-full grid max-w-[70%] gap-[1px] bg-gray border-solid border-2 border-gray`}
    >
      { graphData.graph.map((row, r) => row.map((fieldType, c) => getField(r, c))) }
    </div>
  );
}

type FieldProps = { className: string };

function getColorClassNamesForField(graphData: GraphDataMatrix, r: number, c: number) {
  const fieldType = graphData.graph[r][c];
  const isStartOrEnd = (r === graphData.startNode.y && c === graphData.startNode.x) || (r === graphData.endNode.y && c === graphData.endNode.x);
  const isEmpty = (fieldType === FieldTypesMatrixGraph.empty);
  const isRock = (fieldType === FieldTypesMatrixGraph.rock);
  return `${(isEmpty && !isStartOrEnd) ? "bg-marixGraphFieldEmpty" : ""} ${(isStartOrEnd) ? "bg-startAndEndNode" : ""} ${(isRock) ? "bg-marixGraphFieldRock": ""}`;
}

function Field({ className }: FieldProps) {
  return (
    <div 
      className={`aspect-square ${className}`}
    />
  );
}