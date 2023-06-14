import { getEmptySearchData } from "../getProperDataFunctions";
import { GraphDataDirectedWeighted as GraphDataHere, DirectedWeightedGraph, NodeEdgeGraph, ToNodeDirectedWeightedGraph } from "../graphDataSets/allGraphData";
import { SearchAlgorithmFunDirectedWeighted as SearchAlgorithmFunHere, SearchAlgorithmsFunsDirectedWeighted, SearchAlgorithmsTypes, SearchExecutionDataDirectedWeightedGraph as SearchExecutionDataHere, VisitedNodesEdgeDirectedWieghtedGraph as VisitedNodesHere, VisitedNodesStartNode } from "./allAlgorithmData";

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

function dfsOrBfs(graphData: GraphDataHere, isDfs: boolean): SearchExecutionDataHere {
  const algorithmData = getEmptySearchData(
    (isDfs) ? SearchAlgorithmsTypes.dfs : SearchAlgorithmsTypes.dfs
  ) as SearchExecutionDataHere;
  // Two algorithms in one beacouse there's only one change (stack.pop() or stack.shift)
  const stack = [ graphData.startNode ];
  const visitedNodes = getEmptyVisitedNodes(graphData.graph, graphData.startNode);
  // Search through the graph. Collect data: data.isEndNodeReached, data.listOfSteps and fill visitedNodes 
  while (stack.length > 0 && !algorithmData.isEndNodeReached) {
    const currNode = ((isDfs) ? stack.pop() : stack.shift()) as NodeEdgeGraph;
    algorithmData.listOfSteps.push(currNode);
    for (const neighborNode of getAdjacentNodes(currNode, graphData.graph)) {
      if (isNodeEndNode(neighborNode, graphData.endNode)) {
        algorithmData.isEndNodeReached = true;
        markNodeAsVisited(neighborNode, currNode, visitedNodes);
        break;
      }
      if (!isNodeVisited(neighborNode, visitedNodes)) {
        stack.push(neighborNode);
        markNodeAsVisited(neighborNode, currNode, visitedNodes);
      }
    }
  }
  algorithmData.listOfSteps.shift();

  // Use visitedNodes to backtrack to the startNode and reverse the order to get data.pathToEndNode. Also count data.pathCost.
  if (algorithmData.isEndNodeReached) {
    backtrackToStartNode(graphData, algorithmData, visitedNodes);
  }
  return algorithmData;
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

const dfs: SearchAlgorithmFunHere = function(graphData: GraphDataHere): SearchExecutionDataHere {
  return dfsOrBfs(graphData, true);
}

const bfs: SearchAlgorithmFunHere = function(graphData: GraphDataHere): SearchExecutionDataHere {
  return dfsOrBfs(graphData, false);
}

const searchAlgorithmsFunsDW: SearchAlgorithmsFunsDirectedWeighted = { dfs, bfs };

export default searchAlgorithmsFunsDW;