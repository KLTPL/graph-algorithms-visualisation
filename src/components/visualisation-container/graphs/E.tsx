import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  useUserInput,
  useVisualisationData,
  useVisualisationPointerTools,
} from "../../../context/Context";
import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import NodeEdge, { nodeSizePx } from "../nodes/NodeE";
import {
  backtrackIfShould,
  resetBacktracking,
} from "../scripts/backtrackMechanic";
import { NodeE } from "../../../visualisationData/typesGraphData";
import getProperNodesPosition, {
  NodePosition,
} from "../scripts/getProperNodesPostions";
import EdgeEdge from "../nodes/EdgeE";
import getEdges, { EdgeData } from "../scripts/getEdges";
import addNewNode from "../scripts/addNewNode";
import { VisualisationPointerTools } from "../../visualisation-tools/VisualisationTools";
import {
  displaySummaryIfShould,
  stoDisplayingSummaryIfShould,
} from "../scripts/displaySummaryLogic";

export default function Edge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const { visualisationData: AnyVisualisationData, refreshVisualisationData } =
    useVisualisationData();
  const visualisationData = AnyVisualisationData as VisualisationDataDW;
  const { pointerTool } = useVisualisationPointerTools();
  const { currStepIdx } = useUserInput();
  const isBacktracking = useRef<boolean>(false);
  const [backtrackCount, setBacktrackCount] = useState<number>(0);
  const [isSummaryDisplayed, setIsSummaryDisplayed] = useState<boolean>(false);
  const newEdgeNode1 = useRef<NodeE | null>(null);
  const nodesPositons = getProperNodesPosition(visualisationData);
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
  }, [currStepIdx]);
  useEffect(() => {
    displaySummaryIfShould(
      visualisationData,
      backtrackCount,
      isSummaryDisplayed,
      setIsSummaryDisplayed
    );
  }, [backtrackCount]);
  useEffect(() => {
    stoDisplayingSummaryIfShould(isSummaryDisplayed, setIsSummaryDisplayed);
  }, [currStepIdx]);

  useLayoutEffect(() => {
    setContainerWidth((containerRef.current as HTMLDivElement).offsetWidth);
  }, []);

  function getNode(node: NodeE, nodePos: NodePosition): JSX.Element {
    return (
      <NodeEdge
        key={node}
        backtrackCount={backtrackCount}
        node={node}
        pos={nodePos}
        containerRef={containerRef}
        newEdgeNode1Ref={newEdgeNode1}
      />
    );
  }
  function getEdge(edgeData: EdgeData): JSX.Element {
    return (
      <EdgeEdge
        key={JSON.stringify(edgeData)}
        nodePos1={nodesPositons[edgeData.edge[0]]}
        nodePos2={nodesPositons[edgeData.edge[1]]}
        edgeData={edgeData}
        backtrackCount={backtrackCount}
        containerWidth={containerWidth}
      />
    );
  }
  function handleOnPointerDown(ev: React.PointerEvent) {
    if (
      pointerTool === VisualisationPointerTools.NewNode &&
      visualisationData.graph.length < 26
    ) {
      addNewNode(containerRef.current as HTMLDivElement, ev, visualisationData);
      refreshVisualisationData();
    }
  }

  return (
    <div
      ref={containerRef}
      id="edge-container"
      className="w-[95%] md:w-[60%] aspect-square relative"
      onPointerDown={handleOnPointerDown}
    >
      {[...visualisationData.graph.keys()].map((node, i) =>
        getNode(node, nodesPositons[i])
      )}
      {getEdges(visualisationData).map(edgeData => getEdge(edgeData))}
      {isSummaryDisplayed && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-bg2 z-50 flex flex-col items-center text-white p-3 rounded-lg">
          <button
            className="aspect-square w-10 h-10 absolute right-0 top-0 font-bold"
            onClick={() => setIsSummaryDisplayed(false)}
          >
            -
          </button>
          <h3 className="text-h3">Summary:</h3>
          <ul className="flex flex-col w-full text-center">
            <li className="grid grid-cols-2 grid-rows-1">
              <div>Graph Type:</div>
              <div>{visualisationData.graphType}</div>
            </li>
            <li className="grid grid-cols-2 grid-rows-1">
              <div>Start Node:</div>
              <div>{JSON.stringify(visualisationData.startNode.current)}</div>
            </li>
            <li className="grid grid-cols-2 grid-rows-1">
              <div>End Node:</div>
              <div>{JSON.stringify(visualisationData.endNode.current)}</div>
            </li>
            <li className="grid grid-cols-2 grid-rows-1">
              <div>Algorighm Type:</div>
              <div>{JSON.stringify(visualisationData.algorithmType)}</div>
            </li>
            <li className="grid grid-cols-2 grid-rows-1">
              <div>Path cost:</div>
              <div>{JSON.stringify(visualisationData.pathCost)}</div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
