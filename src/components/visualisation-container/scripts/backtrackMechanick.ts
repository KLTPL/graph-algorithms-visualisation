import { AnyVisualisationData } from "../../../visualisationData/typesVisualisationData";

export function backtrackToFirstNode(
  visualisationData: AnyVisualisationData,
  isBacktracking: React.MutableRefObject<boolean>,
  setBacktrackCount: React.Dispatch<React.SetStateAction<number>>
) {
  const pathLen = visualisationData.pathToEndNode?.length as number;
  // setTimeout so the useEffect above activates first
  setTimeout(async () => {
    isBacktracking.current = true;
    let count = 0;
    do {
      count++;
      setBacktrackCount(count);
      await new Promise(resolve => setTimeout(resolve, 100));
    } while (isBacktracking.current && count <= pathLen);
  });
}

export function resetBacktracking(
  isBacktracking: React.MutableRefObject<boolean>,
  setBacktrackCount: React.Dispatch<React.SetStateAction<number>>
) {
  isBacktracking.current = false;
  setBacktrackCount(0);
}

export function backtrackIfShould(
  visualisationData: AnyVisualisationData,
  isBacktracking: React.MutableRefObject<boolean>,
  currStepIdx: number,
  setBacktrackCount: React.Dispatch<React.SetStateAction<number>>
) {
  if (
    !isBacktracking.current &&
    currStepIdx === visualisationData.listOfSteps.length - 1
  ) {
    backtrackToFirstNode(visualisationData, isBacktracking, setBacktrackCount);
  }
}
