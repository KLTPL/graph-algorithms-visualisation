import { UserInputDataContextProps, VisualisationDataContextProps, useUserInputData, useVisualisationData } from "../../SettingsContext";
import { VisualisationDataMatrix } from "../../visualisationData/allVisualisationData";
import { FieldMatrixGraph, FieldTypesMatrixGraph } from "../../visualisationData/graphDataSets/allGraphData";

export default function Matrix() {
  const visualisationData = (useVisualisationData() as VisualisationDataContextProps).visualisationData as VisualisationDataMatrix;
  const { currStepIdx } = useUserInputData() as UserInputDataContextProps;
  
  function getField(r: number, c: number): JSX.Element {
    return (
      <Field 
        key={`${r};${c}`} 
        className={getColorClassNamesForField(visualisationData, currStepIdx, r, c)} 
      />
    );
  }

  return (
    <div 
      style={{ gridTemplateColumns: `repeat(${visualisationData.graph[0].length}, 1fr)`, gridTemplateRows: `repeat(${visualisationData.graph.length}, 1fr)` }}
      className={`w-full grid max-w-[70%] gap-[1px] bg-gray border-solid border-2 border-gray`}
    >
      { visualisationData.graph.map((row, r) => row.map((fieldType, c) => getField(r, c))) }
    </div>
  );
}

type FieldProps = { className: string };

function getColorClassNamesForField(visualisationData: VisualisationDataMatrix, currStepIdx: number, r: number, c: number): string {
  const listOfSteps = visualisationData.listOfSteps;
  const fieldType = visualisationData.graph[r][c];
  const isStartOrEnd = (r === visualisationData.startNode.y && c === visualisationData.startNode.x) || (r === visualisationData.endNode.y && c === visualisationData.endNode.x);
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