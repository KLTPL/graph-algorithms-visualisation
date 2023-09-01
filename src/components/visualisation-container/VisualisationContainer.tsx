import { UserGraphTypes } from "../../visualisationData/typesGraphData";
import Matrix from "./graph-components/M/M";
import Edge from "./graph-components/E/E";
import { useUserInput, useVisualisationData } from "../../context/Context";
import { AnyVisualisationData } from "../../visualisationData/typesVisualisationData";
import { useEffect, useRef, useState } from "react";
import {
  backtrackIfShould,
  resetBacktracking,
} from "./graph-components/backtrackMechanic";
import {
  displaySummaryIfShould,
  stoDisplayingSummaryIfShould,
} from "./graph-components/displaySummaryLogic";
import Summary from "./Summary";
import { SearchAlgorithmsTypes } from "../../visualisationData/typesAlgorithmData";
import tailwindConfig from "tailwind-config";
import resolveConfig from "tailwindcss/resolveConfig";

const twConfig = resolveConfig(tailwindConfig);

const svgs = {
  decrement: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="currentColor"
      className="bi bi-arrow-left-short"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
      />
    </svg>
  ),
  increment: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="currentColor"
      className="bi bi-arrow-right-short"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
      />
    </svg>
  ),
  play: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
    </svg>
  ),
  pouse: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
    </svg>
  ),
};

function getProperGraphElement(
  { graphType }: AnyVisualisationData,
  backtrackCount: number
): JSX.Element {
  if (graphType === UserGraphTypes.M) {
    return <Matrix backtrackCount={backtrackCount} />;
  }
  return <Edge backtrackCount={backtrackCount} />;
}

export default function GraphContainer() {
  const { visualisationData } = useVisualisationData();
  const {
    currStepIdx,
    updateCurrStepIdx,
    isNodeDistsShow,
    toggleIsNodeDistsShow,
  } = useUserInput();
  const [isSummaryDisplayed, setIsSummaryDisplayed] = useState<boolean>(false);
  const isBacktracking = useRef<boolean>(false);
  const [backtrackCount, setBacktrackCount] = useState<number>(0);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState<boolean>(false);
  const isAnimationPoused = useRef<boolean>(false);

  // after finding the end node algorithm backtracks to show visualisationData.pathToEndNode
  // backtrackCount is the count of how many nodes did the visualisation go back
  function incrementCurrStepIdx() {
    const listOfStepsLen = visualisationData.listOfSteps.length;
    if (currStepIdx < listOfStepsLen - 1) {
      updateCurrStepIdx(currStepIdx + 1);
    }
  }
  function decrementCurrStepIdx() {
    if (currStepIdx >= 0) {
      updateCurrStepIdx(currStepIdx - 1);
    }
  }
  async function playVisualisation() {
    const isAtEnd = currStepIdx === visualisationData.listOfSteps.length - 1;
    const currStepObj = { current: currStepIdx };
    if (isAtEnd) {
      updateCurrStepIdx(0);
      currStepObj.current = 0;
    }
    setIsAnimationPlaying(true);
    const oneStepDurationMs =
      visualisationData.listOfSteps.length - currStepObj.current < 20
        ? 200
        : 100;

    while (currStepObj.current < visualisationData.listOfSteps.length) {
      if (isAnimationPoused.current) {
        isAnimationPoused.current = false;
        return;
      }
      updateCurrStepIdx(currStepObj.current);
      currStepObj.current++;
      await new Promise(res => setTimeout(res, oneStepDurationMs));
    }

    setIsAnimationPlaying(false);
  }
  function pouseVisualisation() {
    isAnimationPoused.current = true;
    setIsAnimationPlaying(false);
  }
  useEffect(
    () => resetBacktracking(isBacktracking, setBacktrackCount),
    [visualisationData.algorithmType, visualisationData.graphType, currStepIdx]
  );
  useEffect(() => {
    stoDisplayingSummaryIfShould(isSummaryDisplayed, setIsSummaryDisplayed);
  }, [currStepIdx]);
  useEffect(() => {
    backtrackIfShould(
      visualisationData,
      isBacktracking,
      currStepIdx,
      setBacktrackCount
    );
  }, [currStepIdx]);
  useEffect(() => {
    displaySummaryIfShould(
      visualisationData,
      currStepIdx,
      backtrackCount,
      isSummaryDisplayed,
      setIsSummaryDisplayed
    );
  }, [backtrackCount]);

  return (
    <div className="mb-8 md:m-0 relative">
      {!isSummaryDisplayed && (
        <button
          className="aspect-square w-10 h-10 absolute right-0 top-0 font-bold"
          onClick={() => setIsSummaryDisplayed(true)}
        >
          +
        </button>
      )}
      {getProperGraphElement(visualisationData, backtrackCount)}
      <div>
        <button onClick={decrementCurrStepIdx}>{svgs.decrement}</button>
        {isAnimationPlaying ? (
          <button onClick={pouseVisualisation}>{svgs.pouse}</button>
        ) : (
          <button onClick={playVisualisation}>{svgs.play}</button>
        )}
        <button onClick={incrementCurrStepIdx}>{svgs.increment}</button>
      </div>
      {visualisationData.algorithmType === SearchAlgorithmsTypes.Dijkstras &&
        visualisationData.graphType === UserGraphTypes.M && (
          <div
            onClick={toggleIsNodeDistsShow}
            className="cursor-pointer ps-3 pe-3 pt-1 pb-1 bg-nodeBorder rounded-lg text-white font-semibold border-2"
            style={{
              borderColor: isNodeDistsShow
                ? twConfig.theme.colors.primary
                : twConfig.theme.colors.nodeBorder,
            }}
          >
            show distances
          </div>
        )}
      {isSummaryDisplayed && (
        <Summary setIsSummaryDisplayed={setIsSummaryDisplayed} />
      )}
    </div>
  );
}
