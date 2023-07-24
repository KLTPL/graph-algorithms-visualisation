import PriorityQueue from "../../../utils/PriorityQueue";
import { getEmptySearchData } from "../../getProperDataFunctions";
import {
  SearchAlgorithmFunDW as SearchAlgorithmFunHere,
  SearchAlgorithmsTypes,
  SearchExecutionDataDW as SearchExecutionDataHere,
  VisitedNodesStartNode,
} from "../../typesAlgorithmData";
import {
  GraphDW as GraphHere,
  GraphDataDW as GraphDataHere,
  NodeE as NodeHere,
  ToNodeDW,
} from "../../typesGraphData";

type VisitedNodesHere = Map<NodeHere, VisitedNodesStartNode | NodeHere | null>;
const START_NODE_SIGN: VisitedNodesStartNode = true;

function getEmptyVisitedNodes({
  graph,
  startNode,
}: GraphDataHere): VisitedNodesHere {
  const visitedNodes: VisitedNodesHere = new Map();
  for (const node of graph.keys()) {
    visitedNodes.set(node, null);
  }
  visitedNodes.set(startNode.current, START_NODE_SIGN);
  return visitedNodes;
}

function markNodeAsVisited(
  node: NodeHere,
  nodeVisitedFrom: NodeHere,
  visitedNodes: VisitedNodesHere
): void {
  visitedNodes.set(node, nodeVisitedFrom);
}

function isNodeVisited(
  node: NodeHere,
  visitedNodes: VisitedNodesHere
): boolean {
  return (
    visitedNodes.get(node) !== null && visitedNodes.get(node) !== undefined
  );
}

function getEmptyCostsArr({ graph, startNode }: GraphDataHere): number[] {
  const costs = new Array(graph.length).fill(Infinity);
  costs[startNode.current] = 0;
  return costs;
}

function backtrackToStartNode(
  { endNode, graph }: GraphDataHere,
  data: SearchExecutionDataHere,
  visitedNodes: VisitedNodesHere
): void {
  // fills data.pathToEndNode and data.pathCost
  data.pathToEndNode = [endNode.current];
  data.pathCost = 0;
  let at = visitedNodes.get(endNode.current) as
    | NodeHere
    | VisitedNodesStartNode;
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
    at = visitedNodes.get(at) as NodeHere | VisitedNodesStartNode;
  }
  data.pathToEndNode.pop();
  data.pathToEndNode.reverse();
}

function getPathCost(
  graph: GraphHere,
  currNode: NodeHere,
  beforeNode: NodeHere
): number {
  return (graph[currNode] as ToNodeDW[]).filter(
    ToNode => ToNode.node === beforeNode
  )[0].cost;
}

const dijsktras: SearchAlgorithmFunHere = function (
  graphData: GraphDataHere
): SearchExecutionDataHere {
  const algorithmData = getEmptySearchData(
    SearchAlgorithmsTypes.Dijsktras
  ) as SearchExecutionDataHere;
  const { graph, startNode, endNode } = graphData;
  const pq = new PriorityQueue<ToNodeDW>(
    (el1: ToNodeDW, el2: ToNodeDW) => el1.cost - el2.cost,
    [{ cost: 0, node: startNode.current }]
  );
  const visitedNodes = getEmptyVisitedNodes(graphData);
  const costs = getEmptyCostsArr(graphData);

  while (!pq.isEmpty() && !algorithmData.isEndNodeReached) {
    const { node: currNode, cost: currCost } = pq.poll() as ToNodeDW;
    if (costs[currNode] > currCost) {
      continue;
    }
    algorithmData.listOfSteps.push({
      to: currNode,
      from: visitedNodes.get(currNode) as NodeHere,
    });
    for (const neighborObj of graph[currNode]) {
      const { node: neighborNode, cost: neighborCost } = neighborObj;

      if (isNodeVisited(neighborNode, visitedNodes)) {
        continue;
      }
      const newCost = currCost + neighborCost;
      if (newCost < costs[neighborNode]) {
        pq.insert({ node: neighborNode, cost: newCost });
        markNodeAsVisited(neighborNode, currNode, visitedNodes);
        costs[neighborNode] = newCost;
      }
      if (neighborNode === endNode.current) {
        algorithmData.listOfSteps.push({ to: neighborNode, from: currNode });
        algorithmData.isEndNodeReached = true;
        break;
      }
    }
  }

  if (algorithmData.isEndNodeReached) {
    backtrackToStartNode(graphData, algorithmData, visitedNodes);
  }

  return algorithmData;
};

export { dijsktras };
