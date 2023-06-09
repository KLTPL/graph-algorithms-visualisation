/*
import { AnyGraphData, AnyNode, DirectedWeightedGraphData, EdgedGraph, FieldMatrixGraph, GraphTypes, MatrixGraph, NodeEdgeGraph, NodeEdgedWeightedGraph } from "./graphDataSets/allGraphData";

export function executeProperSearchAlgorithm(graph: AnyGraphData, searchType: SearchAlgorithms): SearchExecutionData {
  const data: SearchExecutionData = {
    listOfSteps: [],
    isEndNodeReached: false,
    pathToEndNode: [],
    pathCost: Infinity,
  };

  const searchAlgorithm: SearchAlgorithmFun = getSearchAlgorithmFun(searchType);

  searchAlgorithm(graph, data);

  return data;
}

function getSearchAlgorithmFun(searchType: SearchAlgorithms) {
  switch (searchType) {
    case SearchAlgorithms.dfs: return dfs;
    case SearchAlgorithms.bfs: return bfs;
  }
}

function dfs(graphData: AnyGraphData, data: SearchExecutionData): void {
  const stack: AnyNode[] = [ graphData.startNode ];
  const visitedNodes = getEmptyVisitedData(graphData);

  while (stack.length > 0) {
    const currNode = stack.pop() as AnyNode;
    markNodeAsVisited(graphData, visitedNodes, currNode);
    for (const neighborNode of getAdjacentNodes(graphData, currNode)) {
      if (isNodeEndNode(graphData, neighborNode)) {
        data.isEndNodeReached = true;
        break;
      }
      if (!isNodeVisited(graphData, visitedNodes, neighborNode)) {
        stack.push(neighborNode);
      }
    }
  }
}

function bfs(graphData: AnyGraphData, data: SearchExecutionData): void {
  const queue = [ graphData.startNode ];

}

function getEmptyVisitedData(graphData: AnyGraphData): VisitedNodesData {
  const graphAsMatrix = graphData.graph as MatrixGraph;
  return (
    (graphData.type === GraphTypes.matrix) ?
    new Array(graphAsMatrix.length).fill(null).map(() => new Array(graphAsMatrix[0].length).fill(false)) :
    new Set<string>()
  );
}

function getAdjacentNodes(graphData: AnyGraphData, currNode: AnyNode)
: FieldMatrixGraph[]|NodeEdgedWeightedGraph[]|NodeEdgeGraph[] {
  if (graphData.type === GraphTypes.matrix) {
    const directions = [ { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 } ];
    const currNodeAsField = currNode as FieldMatrixGraph;
    return directions.map(dir => { return {x: currNodeAsField.x + dir.x, y: currNodeAsField.y + dir.y }});
  }
  if (graphData.type === GraphTypes.directedWeighted) {
    const currNodeEdgedWeightedGraph = currNode as NodeEdgedWeightedGraph;
    const graph = (graphData as DirectedWeightedGraphData).graph;
    const adjNodes = graph.get(currNodeEdgedWeightedGraph.node);
    if (adjNodes === undefined) {
      throw new Error(`node '${currNodeEdgedWeightedGraph.node}' not found in graph`);
    }
    return adjNodes;
  }
  const currNodeEdgedGraph = currNode as NodeEdgeGraph;
  const graph = graphData.graph as EdgedGraph;
  const adjNodes = graph.get(currNodeEdgedGraph);
  if (adjNodes === undefined) {
    throw new Error(`node '${currNodeEdgedGraph}' not found in graph`);
  }
  return adjNodes;
}

function isNodeVisited(graphData: AnyGraphData, visitedNodes: VisitedNodesData, node: AnyNode): boolean {
  if (graphData.type === GraphTypes.matrix) {
    const visitedNodesMatrix = visitedNodes as boolean[][];
    const nodeMatrixGraph = node as FieldMatrixGraph;
    return visitedNodesMatrix[nodeMatrixGraph.y][nodeMatrixGraph.x];
  }
  const visitedNodesAsSet = visitedNodes as Set<NodeEdgeGraph>;
  const nodeEdgedGraph = 
    (graphData.type === GraphTypes.directedWeighted) ? 
    (node as NodeEdgedWeightedGraph).node :
    node as NodeEdgeGraph;
  return visitedNodesAsSet.has(nodeEdgedGraph);
}

function markNodeAsVisited(graphData: AnyGraphData, visitedNodes: VisitedNodesData, node: AnyNode): void {
  if (graphData.type === GraphTypes.matrix) {
    const visitedNodesMatrix = visitedNodes as boolean[][];
    const nodeMatrixGraph = node as FieldMatrixGraph;
    visitedNodesMatrix[nodeMatrixGraph.y][nodeMatrixGraph.x] = true;
    return;
  }
  const visitedNodesAsSet = visitedNodes as Set<NodeEdgeGraph>;
  const nodeEdgedGraph = 
    (graphData.type === GraphTypes.directedWeighted) ? 
    (node as NodeEdgedWeightedGraph).node :
    node as NodeEdgeGraph;
  visitedNodesAsSet.add(nodeEdgedGraph);
}

function isNodeEndNode(graphData: AnyGraphData, node: AnyNode) {
  if (graphData.type === GraphTypes.matrix) {
    const nodeMatrixGraph = node as FieldMatrixGraph;
    const endNodeMatrixGraph = graphData.endNode as FieldMatrixGraph;
    return nodeMatrixGraph.x === endNodeMatrixGraph.x && nodeMatrixGraph.y === endNodeMatrixGraph.y;
  }
  const nodeEdgedGraph = 
    (graphData.type === GraphTypes.directedWeighted) ? 
    (node as NodeEdgedWeightedGraph).node :
    node as NodeEdgeGraph;
  const endNodeEdgedGraph = graphData.endNode as NodeEdgeGraph;
  return nodeEdgedGraph === endNodeEdgedGraph;
}
*/