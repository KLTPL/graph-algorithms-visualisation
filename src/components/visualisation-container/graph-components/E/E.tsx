import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  useUserInput,
  useVisualisationData,
  useVisualisationPointerTools,
} from "../../../../context/Context";
import { VisualisationDataDW } from "../../../../visualisationData/typesVisualisationData";
import NodeEdge from "../../element-components/nodeE/NodeE";
import { NodeE } from "../../../../visualisationData/typesGraphData";
import getProperNodesPosition, { NodePosition } from "./getProperNodesPostions";
import EdgeEdge from "../../element-components/edgeE/EdgeE";
import getEdges, { EdgeData } from "./getEdges";
import addNewNode from "./addNewNode";
import { VisualisationPointerTools } from "../../../visualisation-tools/VisualisationTools";

export default function Edge({ backtrackCount }: { backtrackCount: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const { visualisationData: AnyVisualisationData, refreshVisualisationData } =
    useVisualisationData();
  const visualisationData = AnyVisualisationData as VisualisationDataDW;
  const { pointerTool } = useVisualisationPointerTools();
  const newEdgeNode1 = useRef<NodeE | null>(null);
  const nodesPositons = getProperNodesPosition(visualisationData);
  // after finding the end node algorithm backtracks to show visualisationData.pathToEndNode
  // backtrackCount is the count of how many nodes did the visualisation go back

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
    </div>
  );
}
