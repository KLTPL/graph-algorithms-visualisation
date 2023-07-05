import { AnyVisualisationData } from "../../../visualisationData/typesVisualisationData";

export function displaySummaryIfShould(
  visualisationData: AnyVisualisationData,
  backtrackCount: number,
  isSummaryDisplayed: boolean,
  setIsSummaryDisplayed: React.Dispatch<React.SetStateAction<boolean>>
) {
  const pathLen = visualisationData.pathToEndNode?.length;
  if (
    pathLen !== undefined &&
    backtrackCount === pathLen + 1 &&
    !isSummaryDisplayed
  ) {
    setIsSummaryDisplayed(true);
  }
}

export function stoDisplayingSummaryIfShould(
  isSummaryDisplayed: boolean,
  setIsSummaryDisplayed: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (isSummaryDisplayed) {
    setIsSummaryDisplayed(false);
  }
}
