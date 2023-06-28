import { getEmptySearchData } from "../getProperDataFunctions";
import {
  GraphDataDW as GraphDataHere,
  GraphDW,
  NodeE,
  ToNodeDW,
} from "../typesGraphData";
import {
  SearchAlgorithmFunDW as SearchAlgorithmFunHere,
  SearchAlgorithmsFunsDW,
  SearchAlgorithmsTypes,
  SearchExecutionDataDW as SearchExecutionDataHere,
  VisitedNodesDW as VisitedNodesHere,
  VisitedNodesStartNode,
} from "../typesAlgorithmData";

const START_NODE_SIGN: VisitedNodesStartNode = true;

function isNodeVisited(node: NodeE, visitedNodes: VisitedNodesHere): boolean {
  return !(visitedNodes.get(node) === null);
}

function markNodeAsVisited(
  node: NodeE,
  nodeVisitedFrom: NodeE,
  visitedNodes: VisitedNodesHere
): void {
  visitedNodes.set(node, nodeVisitedFrom);
}

function isNodeEndNode(node: NodeE, endNode: NodeE) {
  return node === endNode;
}

function getEmptyVisitedNodes(
  graph: GraphDW,
  startNode: NodeE
): VisitedNodesHere {
  const visitedNodes: VisitedNodesHere = new Map();
  for (const node of graph.keys()) {
    visitedNodes.set(node, null);
  }
  visitedNodes.set(startNode, START_NODE_SIGN);
  return visitedNodes;
}

function getAdjacentNodes(currNode: NodeE, graph: GraphDW): NodeE[] {
  const neighborNodes = graph[currNode];
  if (neighborNodes === undefined) {
    throw new Error(`Cannot find node ${currNode} in graph.`);
  }
  return neighborNodes.map(toNode => toNode.node);
}

function dfsOrBfs(
  graphData: GraphDataHere,
  isDfs: boolean
): SearchExecutionDataHere {
  const { graph, startNode, endNode } = graphData;
  const algorithmData = getEmptySearchData(
    isDfs ? SearchAlgorithmsTypes.Dfs : SearchAlgorithmsTypes.Bfs
  ) as SearchExecutionDataHere;
  // Two algorithms in one beacouse there's only one change (stack.pop() or stack.shift)
  const stack = [graphData.startNode.current];
  const visitedNodes = getEmptyVisitedNodes(
    graphData.graph,
    startNode.current
  );
  // Search through the graph. Collect data: data.isEndNodeReached, data.listOfSteps and fill visitedNodes
  while (stack.length > 0 && !algorithmData.isEndNodeReached) {
    const currNode = (isDfs ? stack.pop() : stack.shift()) as NodeE;
    const visitedFrom = visitedNodes.get(currNode) as
      | NodeE
      | VisitedNodesStartNode;
    const nodeFrom =
      visitedFrom === START_NODE_SIGN ? graphData.startNode.current : visitedFrom;
    algorithmData.listOfSteps.push({ to: currNode, from: nodeFrom });
    if (isNodeEndNode(currNode, graphData.endNode.current)) {
      algorithmData.isEndNodeReached = true;
      markNodeAsVisited(currNode, nodeFrom, visitedNodes);
      break;
    }
    for (const neighborNode of getAdjacentNodes(currNode, graphData.graph)) {

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

function backtrackToStartNode(
  { endNode, graph }: GraphDataHere,
  data: SearchExecutionDataHere,
  visitedNodes: VisitedNodesHere
): void {
  // fills data.pathToEndNode and data.pathCost
  data.pathToEndNode = [endNode.current];
  data.pathCost = 0;
  let at = visitedNodes.get(endNode.current);
  while (at !== true) {
    // at!==null just for type safety
    if (at === null || at === undefined) {
      throw new Error("visited nodes arr filed incorrectly");
    }
    data.pathCost += getPathCost(
      graph,
      at,
      data.pathToEndNode.at(-1) as NodeE
    );
    data.pathToEndNode.push(at);
    at = visitedNodes.get(at);
  }
  data.pathToEndNode.pop();
  data.pathToEndNode.reverse();
}

function getPathCost(
  graph: GraphDW,
  currNode: NodeE,
  beforeNode: NodeE
): number {
  return (graph[currNode] as ToNodeDW[]).filter(
    ToNode => ToNode.node === beforeNode
  )[0].cost;
}

const dfs: SearchAlgorithmFunHere = function (
  graphData: GraphDataHere
): SearchExecutionDataHere {
  return dfsOrBfs(graphData, true);
};

const bfs: SearchAlgorithmFunHere = function (
  graphData: GraphDataHere
): SearchExecutionDataHere {
  return dfsOrBfs(graphData, false);
};

const searchAlgorithmsFunsDW: SearchAlgorithmsFunsDW = {
  dfs,
  bfs,
};

export default searchAlgorithmsFunsDW;
