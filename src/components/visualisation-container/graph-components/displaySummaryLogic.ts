import { AnyVisualisationData } from "../../../visualisationData/typesVisualisationData";

export function displaySummaryIfShould(
  { pathToEndNode, isEndNodeReached, listOfSteps }: AnyVisualisationData,
  currStepIdx: number,
  backtrackCount: number,
  isSummaryDisplayed: boolean,
  setIsSummaryDisplayed: React.Dispatch<React.SetStateAction<boolean>>
) {
  const pathLen = pathToEndNode?.length;
  setTimeout(() => {
    if (
      !isSummaryDisplayed &&
      ((!isEndNodeReached && currStepIdx === listOfSteps.length - 1) ||
        (isEndNodeReached &&
          pathLen !== undefined &&
          backtrackCount === pathLen + 1))
    ) {
      setIsSummaryDisplayed(true);
    }
  }, 250);
}

export function stoDisplayingSummaryIfShould(
  isSummaryDisplayed: boolean,
  setIsSummaryDisplayed: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (isSummaryDisplayed) {
    setIsSummaryDisplayed(false);
  }
}
