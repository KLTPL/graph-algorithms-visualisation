import { VisualisationDataMatrix } from "../../visualisationData/allVisualisationData";
import { FieldMatrixGraph, FieldTypesMatrixGraph } from "../../visualisationData/graphDataSets/allGraphData";
import { GraphComponentMatrixProps } from "../GraphContainer";

export default function Matrix({ visualisationData }: GraphComponentMatrixProps) {
  const graphData = visualisationData.graphAndAlgorithm.graphData;
  function getField(r: number, c: number): JSX.Element {
    return (
      <Field 
        key={`${r};${c}`} 
        className={getColorClassNamesForField(visualisationData, r, c)} 
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

function getColorClassNamesForField(visualisationData: VisualisationDataMatrix, r: number, c: number): string {
  const { graphAndAlgorithm, currStepIdx } = visualisationData;
  const { algorithmData, graphData } = graphAndAlgorithm;
  const listOfSteps = algorithmData.listOfSteps;
  const fieldType = graphData.graph[r][c];
  const isStartOrEnd = (r === graphData.startNode.y && c === graphData.startNode.x) || (r === graphData.endNode.y && c === graphData.endNode.x);
  const isEmpty = (fieldType === FieldTypesMatrixGraph.empty);
  const isRock = (fieldType === FieldTypesMatrixGraph.rock);
  const isFieldVisited = isStepAlreadyMade(currStepIdx, listOfSteps, r, c);
  return (
    `${(isEmpty && !isStartOrEnd) ? "bg-marixGraphFieldEmpty" : ""} ${(isStartOrEnd) ? "bg-startAndEndNode" : ""} ${(isRock) ? "bg-marixGraphFieldRock": ""} ${(isFieldVisited) ? "bg-primary" : ""}`
  );
}

function isStepAlreadyMade(currStepIdx: number, listOfSteps: FieldMatrixGraph[], r: number, c: number): boolean {
  for (let i=0 ; i<=currStepIdx ; i++) {
    const { x, y } = listOfSteps[i];
    if (x === c && y === r) {
      return true;
    }
  }
  return false;
}

function Field({ className }: FieldProps) {
  return (
    <div 
      className={`aspect-square ${className}`}
    />
  );
}