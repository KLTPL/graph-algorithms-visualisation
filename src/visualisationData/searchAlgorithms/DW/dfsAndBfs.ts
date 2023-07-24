import { getEmptySearchData } from "../../getProperDataFunctions";
import {
  GraphDataDW as GraphDataHere,
  GraphDW,
  NodeE as NodeHere,
  ToNodeDW,
} from "../../typesGraphData";
import {
  SearchAlgorithmFunDW as SearchAlgorithmFunHere,
  SearchAlgorithmsTypes,
  SearchExecutionDataDW as SearchExecutionDataHere,
  VisitedNodesStartNode,
} from "../../typesAlgorithmData";
// from node to: null - not visited or NodeEdgeGraph - node was visited from
export type VisitedNodesHere = Map<
  NodeHere,
  VisitedNodesStartNode | null | NodeHere
>;
const START_NODE_SIGN: VisitedNodesStartNode = true;

function isNodeVisited(
  node: NodeHere,
  visitedNodes: VisitedNodesHere
): boolean {
  return !(visitedNodes.get(node) === null);
}

function markNodeAsVisited(
  node: NodeHere,
  nodeVisitedFrom: NodeHere,
  visitedNodes: VisitedNodesHere
): void {
  visitedNodes.set(node, nodeVisitedFrom);
}

function isNodeHerendNode(node: NodeHere, endNode: NodeHere) {
  return node === endNode;
}

function getEmptyVisitedNodes(
  graph: GraphDW,
  startNode: NodeHere
): VisitedNodesHere {
  const visitedNodes: VisitedNodesHere = new Map();
  for (const node of graph.keys()) {
    visitedNodes.set(node, null);
  }
  visitedNodes.set(startNode, START_NODE_SIGN);
  return visitedNodes;
}

function getAdjacentNodes(currNode: NodeHere, graph: GraphDW): NodeHere[] {
  const neighborNodes = graph[currNode];
  if (neighborNodes === undefined) {
    throw new Error(`Cannot find node ${currNode} in graph.`);
  }
  return neighborNodes.map(toNode => toNode.node);
}

function getGetCurrNodeFun(isDfs: boolean): (stack: NodeHere[]) => NodeHere {
  return isDfs
    ? (stack: NodeHere[]) => stack.pop() as NodeHere
    : (stack: NodeHere[]) => stack.shift() as NodeHere;
}

function dfsOrBfsAlgorithm(
  graphData: GraphDataHere,
  isDfs: boolean
): {
  visitedNodes: VisitedNodesHere;
  listOfSteps: {
    to: NodeHere;
    from: NodeHere;
  }[];
} {
  const { graph, startNode, endNode } = graphData;
  const listOfSteps: { to: NodeHere; from: NodeHere }[] = [];
  // Two algorithms in one beacouse there's only one change (stack.pop() or stack.shift)
  const stack = [startNode.current];
  const visitedNodes = getEmptyVisitedNodes(graph, startNode.current);
  const getCurrNode = getGetCurrNodeFun(isDfs);
  // Search through the graph. Collect data: data.isEndNodeReached, data.listOfSteps and fill visitedNodes
  while (stack.length > 0) {
    const currNode = getCurrNode(stack);
    const visitedFrom = visitedNodes.get(currNode) as
      | NodeHere
      | VisitedNodesStartNode;
    const nodeFrom =
      visitedFrom === START_NODE_SIGN ? startNode.current : visitedFrom;
    listOfSteps.push({ to: currNode, from: nodeFrom });
    if (isNodeHerendNode(currNode, endNode.current)) {
      markNodeAsVisited(currNode, nodeFrom, visitedNodes);
      listOfSteps.shift();
      return { visitedNodes, listOfSteps };
    }
    for (const neighborNode of getAdjacentNodes(currNode, graph)) {
      if (!isNodeVisited(neighborNode, visitedNodes)) {
        stack.push(neighborNode);
        markNodeAsVisited(neighborNode, currNode, visitedNodes);
      }
    }
  }
  listOfSteps.shift();
  return { visitedNodes, listOfSteps };
}

function dfsOrBfs(
  graphData: GraphDataHere,
  isDfs: boolean
): SearchExecutionDataHere {
  const { listOfSteps, visitedNodes } = dfsOrBfsAlgorithm(graphData, isDfs);
  const algorithmData = getEmptySearchData(
    isDfs ? SearchAlgorithmsTypes.Dfs : SearchAlgorithmsTypes.Bfs
  ) as SearchExecutionDataHere;

  algorithmData.listOfSteps = listOfSteps;
  algorithmData.isEndNodeReached =
    visitedNodes.get(graphData.endNode.current) !== null;
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
  while (at !== START_NODE_SIGN) {
    // at!==null just for type safety
    if (at === null || at === undefined) {
      throw new Error("visited nodes arr filed incorrectly");
    }
    data.pathCost += getPathCost(
      graph,
      at,
      data.pathToEndNode.at(-1) as NodeHere
    );
    data.pathToEndNode.push(at);
    at = visitedNodes.get(at);
  }
  data.pathToEndNode.pop();
  data.pathToEndNode.reverse();
}

function getPathCost(
  graph: GraphDW,
  currNode: NodeHere,
  beforeNode: NodeHere
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

export default {
  dfs,
  bfs,
};
