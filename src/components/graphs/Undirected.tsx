import { useEffect, useRef, useState } from "react";
import { useUserInputData, useVisualisationData } from "../../SettingsContext";
import { VisualisationDataDirectedWeighted } from "../../visualisationData/typesVisualisationData";
import NodeEdge from "./elements/NodeEdge";
import {
  backtrackIfShould,
  resetBacktracking,
} from "./scripts/backtrackMechanick";
import { NodeEdgeGraph } from "../../visualisationData/typesGraphData";
import {
  getDefaultNodesPositionsUndirected,
  NodePosition,
  NodesPositions,
} from "./scripts/getDefaultNodesPostions";
import EdgeUndirected from "./elements/EdgeUndirected";
import getEdges from "./scripts/getEdges";

export default function Undirected() {
  const visualisationData = useVisualisationData()
    .visualisationData as VisualisationDataDirectedWeighted;
  const { currStepIdx } = useUserInputData();
  const isBacktracking = useRef<boolean>(false);
  const [backtrackCount, setBacktrackCount] = useState<number>(0);
  const nodes = [...visualisationData.graph.keys()];
  // after finding the end node algorithm backtracks to show visualisationData.pathToEndNode
  // backtrackCount is the count of how many nodes did the visualisation go back
  const [nodesPositons, setNodesPostions] = useState<NodesPositions>(
    getDefaultNodesPositionsUndirected()
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

  function getNode(node: NodeEdgeGraph, nodePos: NodePosition): JSX.Element {
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
      {nodes.map((node, i) => getNode(node, nodesPositons[i]))}
      {getEdges(visualisationData.graph).map((edge, key) => {
        const node1Idx = nodes.indexOf(edge[0]);
        const node2Idx = nodes.indexOf(edge[1]);
        const isCurrentEdge =
          (visualisationData.listOfSteps[currStepIdx] === edge[0] &&
            (visualisationData.startNode === edge[1] || visualisationData.listOfSteps[currStepIdx - 1] === edge[1])) ||
          (visualisationData.listOfSteps[currStepIdx] === edge[1] &&
            (edge[0] === visualisationData.startNode || visualisationData.listOfSteps[currStepIdx - 1] === edge[0]));
        return (
          <EdgeUndirected
            key={key}
            nodePos1={nodesPositons[node1Idx]}
            nodePos2={nodesPositons[node2Idx]}
            isCurrentEdge={isCurrentEdge}
          />
        );
      })}
    </div>
  );
}
