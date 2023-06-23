import { useEffect, useRef, useState } from "react";
import { useUserInputData, useVisualisationData } from "../../SettingsContext";
import { VisualisationDataDirectedWeighted } from "../../visualisationData/typesVisualisationData";
import NodeEdge from "./elements/NodeEdge";
import {
  backtrackIfShould,
  resetBacktracking,
} from "./scripts/backtrackMechanick";
import { NodeEdgeGraph } from "../../visualisationData/typesGraphData";
import getRandomNodesPositions, {
  NodePostion,
  NodesPostions,
} from "./scripts/getRandomNodesPostions";

export default function Undirected() {
  const visualisationData = useVisualisationData()
    .visualisationData as VisualisationDataDirectedWeighted;
  const { currStepIdx } = useUserInputData();
  const isBacktracking = useRef<boolean>(false);
  const [backtrackCount, setBacktrackCount] = useState<number>(0);
  const nodes = [...visualisationData.graph.keys()];
  // after finding the end node algorithm backtracks to show visualisationData.pathToEndNode
  // backtrackCount is the count of how many nodes did the visualisation go back
  const [nodesPositons, setNodesPostions] = useState<NodesPostions>(
    getRandomNodesPositions(nodes.length)
  );
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

  function getNode(node: NodeEdgeGraph, nodePos: NodePostion): JSX.Element {
    return (
      <NodeEdge
        key={node}
        visualisationData={visualisationData}
        currStepIdx={currStepIdx}
        backtrackCount={backtrackCount}
        node={node}
        pos={nodePos}
      />
    );
  }

  return (
    <div className="w-[60%] aspect-square relative">
      {[...visualisationData.graph.keys()].map((node, i) =>
        getNode(node, nodesPositons[i])
      )}
    </div>
  );
}
