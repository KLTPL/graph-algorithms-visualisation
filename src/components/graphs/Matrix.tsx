import { useUserInputData, useVisualisationData } from "../../SettingsContext";
import { VisualisationDataMatrix } from "../../visualisationData/typesVisualisationData";
import { FieldMatrixGraph, FieldTypesMatrixGraph } from "../../visualisationData/typesGraphData";
import { useEffect, useRef, useState } from "react";

export default function Matrix() {
  const visualisationData = useVisualisationData().visualisationData as VisualisationDataMatrix;
  const { currStepIdx } = useUserInputData();
  const isBacktracking = useRef<boolean>(false);
  const [ backtrackCount, setBacktrackCount ] = useState<number>(0);
  // after finding the end node algorithm backtracks to show visualisationData.pathToEndNode
  // backtrackCount is the count of how many nodes did the visualisation go back

  useEffect(() => {
    isBacktracking.current = false;
    setBacktrackCount(0);
  }, [ visualisationData.algorithmType, visualisationData.graphType, currStepIdx ]);

  useEffect(() => {
    if (
      !isBacktracking.current &&
      currStepIdx === visualisationData.listOfSteps.length - 1
    ) {
      backtrackToFirstNode();
    }
  });

  function backtrackToFirstNode() {
    const pathLen = visualisationData.pathToEndNode?.length as number;
    // setTimeout so the useEffect above activates first
    setTimeout(async () => {
      isBacktracking.current = true;
      let count = 0;
      do {
        count++;
        setBacktrackCount(count);
        await new Promise((resolve) => setTimeout(resolve, 100));
      } while (isBacktracking.current && count < pathLen);
    })
  }

  function getField(r: number, c: number): JSX.Element {
    return (
      <Field 
        key={`${r};${c}`} 
        className={getColorClassNamesForField(visualisationData, currStepIdx, backtrackCount, r, c)} 
      />
    );
  }

  return (
    <div 
      style={{ gridTemplateColumns: `repeat(${visualisationData.graph[0].length}, 1fr)`, gridTemplateRows: `repeat(${visualisationData.graph.length}, 1fr)` }}
      className={`w-[90%] grid max-w-[500px] gap-[1px] bg-gray border-solid border-2 border-gray`}
    >
      { visualisationData.graph.map((row, r) => row.map((fieldType, c) => getField(r, c))) }
    </div>
  );
}

type FieldProps = { className: string };

function getColorClassNamesForField(visualisationData: VisualisationDataMatrix, currStepIdx: number, backtrackCount: number, r: number, c: number): string {
  const listOfSteps = visualisationData.listOfSteps;
  const fieldType = visualisationData.graph[r][c];
  const isStartNode = (r === visualisationData.startNode.y && c === visualisationData.startNode.x);
  const isStartEndNode = (r === visualisationData.endNode.y && c === visualisationData.endNode.x);
  const isStartOrEnd = isStartNode || isStartEndNode;
  const isEmpty = (fieldType === FieldTypesMatrixGraph.empty);
  const isRock = (fieldType === FieldTypesMatrixGraph.rock);
  const isFieldVisited = isStepAlreadyMade(currStepIdx, listOfSteps, r, c);
  const isCurrField = isFieldCurrFiled(visualisationData, currStepIdx, r, c);
  const isReachedEndNode = isStartEndNode && isFieldVisited;
  const isOnBacktrack = isNodeOnBacktrack(visualisationData, backtrackCount, r, c);

  const conditionAndValuePairs = [
    [isEmpty && !isStartOrEnd && !isOnBacktrack, "bg-marixGraphFieldEmpty"],
    [isStartOrEnd && !isReachedEndNode, "bg-startAndEndNode"],
    [isRock, "bg-rock"],
    [isFieldVisited && !isReachedEndNode && !isOnBacktrack, "bg-primary"],
    [isCurrField, "after:content-[''] after:rounded-[50%] after:bg-black after:w-[7px] after:h-[7px]"],
    [isReachedEndNode, "bg-green"],
    [isOnBacktrack, "bg-orange"],
  ];

  return conditionAndValuePairs
    .filter(arr => arr[0])
    .map(arr => arr[1])
    .join(" ");
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

function isNodeOnBacktrack(visualisationData: VisualisationDataMatrix, backtrackCount: number, r: number, c: number): boolean {
  // after finding the end node algorithm backtracks to show visualisationData.pathToEndNode
  // backtrackCount is the count of how many nodes did the visualisation go back
  const path = visualisationData.pathToEndNode as FieldMatrixGraph[];
  for (let i=1 ; i<backtrackCount ; i++) {
    const newNode = path.at(-(i + 1));
    if (newNode !== undefined && r === newNode.y && c === newNode.x) {
      return true;
    }
  }
  return false;
}

function isFieldCurrFiled(visualisationData: VisualisationDataMatrix, currStepIdx: number, r: number, c: number): boolean {
  const field = visualisationData.listOfSteps[currStepIdx];
  return (
    field !== undefined &&
    field.x === c &&
    field.y === r
  );
}

function Field({ className }: FieldProps) {
  return (
    <div 
      className={`aspect-square grid place-content-center ${className}`}
    />
  );
}