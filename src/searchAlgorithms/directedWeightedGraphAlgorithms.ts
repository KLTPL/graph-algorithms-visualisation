import { DirectedWeightedGraphData as GraphDataHere, DirectedWeightedGraph, NodeEdgeGraph, ToNodeDirectedWeightedGraph } from "../graphDataSets/allGraphData";
import { SearchAlgorithmFunDirectedWeightedGraph as SearchAlgorithmFunHere, SearchExecutionDataEdgeGraph as SearchExecutionDataHere, VisitedNodesEdgeDirectedWieghtedGraph as VisitedNodesHere, VisitedNodesStartNode } from "./allAlgorithmData";

const START_NODE_SIGN: VisitedNodesStartNode = true;

function isNodeVisited(node: NodeEdgeGraph, visitedNodes: VisitedNodesHere): boolean {
  return !(visitedNodes.get(node) === null);
}

function markNodeAsVisited(node: NodeEdgeGraph, nodeVisitedFrom: NodeEdgeGraph, visitedNodes: VisitedNodesHere): void {
  visitedNodes.set(node, nodeVisitedFrom);
}

function isNodeEndNode(node: NodeEdgeGraph, endNode: NodeEdgeGraph) {
  return node === endNode;
}

function getEmptyVisitedNodes(graph: DirectedWeightedGraph, startNode: NodeEdgeGraph): VisitedNodesHere {
  const visitedNodes: VisitedNodesHere = new Map();
  for (const node of graph.keys()) {
    visitedNodes.set(node, null);
  }
  visitedNodes.set(startNode, START_NODE_SIGN);
  return visitedNodes;
}

function getAdjacentNodes(currNode: NodeEdgeGraph, graph: DirectedWeightedGraph): NodeEdgeGraph[] {
  const neighborNodes = graph.get(currNode);
  if (neighborNodes === undefined) {
    throw new Error(`Cannot find node ${currNode} in graph.`);
  }
  return neighborNodes.map(toNode => toNode.node);
}

export const dfs: SearchAlgorithmFunHere = function(graphData: GraphDataHere, data: SearchExecutionDataHere): void {
  dfsOrBfs(graphData, data, true);
}

export const bfs: SearchAlgorithmFunHere = function(graphData: GraphDataHere, data: SearchExecutionDataHere): void {
  dfsOrBfs(graphData, data, false);
  
}

function dfsOrBfs(graphData: GraphDataHere, data: SearchExecutionDataHere, isDfs: boolean): void {
  // Two algorithms in one beacouse there's only one change (stack.pop() or stack.shift)
  const stack = [ graphData.startNode ];
  const visitedNodes = getEmptyVisitedNodes(graphData.graph, graphData.startNode);
  // Search through the graph. Collect data: data.isEndNodeReached, data.listOfSteps and fill visitedNodes 
  while (stack.length > 0 && !data.isEndNodeReached) {
    const currNode = ((isDfs) ? stack.pop() : stack.shift()) as NodeEdgeGraph;
    data.listOfSteps.push(currNode);
    for (const neighborNode of getAdjacentNodes(currNode, graphData.graph)) {
      if (isNodeEndNode(neighborNode, graphData.endNode)) {
        data.isEndNodeReached = true;
        markNodeAsVisited(neighborNode, currNode, visitedNodes);
        break;
      }
      if (!isNodeVisited(neighborNode, visitedNodes)) {
        stack.push(neighborNode);
        markNodeAsVisited(neighborNode, currNode, visitedNodes);
      }
    }
  }
  data.listOfSteps.shift();

  // Use visitedNodes to backtrack to the startNode and reverse the order to get data.pathToEndNode. Also count data.pathCost.
  if (data.isEndNodeReached) {
    backtrackToStartNode(graphData, data, visitedNodes);
  }
  console.log(`visitedNodes`, visitedNodes);
}

function backtrackToStartNode(graphData: GraphDataHere, data: SearchExecutionDataHere, visitedNodes: VisitedNodesHere): void { // fills data.pathToEndNode and data.pathCost
  data.pathToEndNode = [ graphData.endNode ];
  data.pathCost = 0;
  let at = visitedNodes.get(graphData.endNode);
  while (at !== true) { // at!==null just for type safety 
    if (at === null || at === undefined) {
      throw new Error("visited nodes arr filed incorrectly");
    }
    data.pathCost += getPathCost(graphData.graph, at, data.pathToEndNode.at(-1) as NodeEdgeGraph);
    data.pathToEndNode.push(at);
    at = visitedNodes.get(at);
  }
  data.pathToEndNode.pop();
  data.pathToEndNode.reverse();
}

function getPathCost(graph: DirectedWeightedGraph, currNode: NodeEdgeGraph, beforeNode: NodeEdgeGraph): number {
  return (graph.get(currNode) as ToNodeDirectedWeightedGraph[]).filter(ToNode => ToNode.node === beforeNode)[0].cost;
}