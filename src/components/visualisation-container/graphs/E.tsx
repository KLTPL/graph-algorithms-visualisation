import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useUserInput, useVisualisationData } from "../../../context/Context";
import { VisualisationDataDW } from "../../../visualisationData/typesVisualisationData";
import NodeEdge from "../nodes/NodeE";
import {
  backtrackIfShould,
  resetBacktracking,
} from "../scripts/backtrackMechanick";
import { NodeE } from "../../../visualisationData/typesGraphData";
import getProperNodesPosition, {
  NodePosition,
} from "../scripts/getProperNodesPostions";
import EdgeEdge from "../nodes/EdgeE";
import getEdges from "../scripts/getEdges";

export default function Edge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const visualisationData = useVisualisationData()
    .visualisationData as VisualisationDataDW;
  const { currStepIdx } = useUserInput();
  const isBacktracking = useRef<boolean>(false);
  const [backtrackCount, setBacktrackCount] = useState<number>(0);
  const nodes = [...visualisationData.graph.keys()];
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
  });

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
      />
    );
  }

  return (
    <div
      ref={containerRef}
      id="edge-container"
      className="w-[95%] md:w-[60%] aspect-square relative"
    >
      {nodes.map((node, i) => getNode(node, nodesPositons[i]))}
      {getEdges(visualisationData).map((edgeData, key) => {
        return (
          <EdgeEdge
            key={key}
            nodePos1={nodesPositons[edgeData.edge[0]]}
            nodePos2={nodesPositons[edgeData.edge[1]]}
            edgeData={edgeData}
            backtrackCount={backtrackCount}
            containerWidth={containerWidth}
          />
        );
      })}
    </div>
  );
}
