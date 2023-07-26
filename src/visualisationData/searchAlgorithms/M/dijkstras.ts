import PriorityQueue from "../../../utils/PriorityQueue";
import { getEmptySearchData } from "../../getProperDataFunctions";
import {
  SearchAlgorithmFunM as SearchAlgorithmFunHere,
  SearchAlgorithmsTypes,
  SearchExecutionDataM as SearchExecutionDataHere,
  VisitedNodesStartNode,
} from "../../typesAlgorithmData";
import {
  FieldM,
  GraphDataM as GraphDataHere,
  GraphM as GraphHere,
  NodeTypesM,
} from "../../typesGraphData";

type VisitedNodesHere = (VisitedNodesStartNode | null | FieldM)[][];
const START_NODE_SIGN: VisitedNodesStartNode = true;

function getPQFun(
  graphData: GraphDataHere
): (el1: FieldM, el2: FieldM) => number {
  return (el1, el2) => {
    return (
      getFieldDistFromEndNode(el1, graphData) -
      getFieldDistFromEndNode(el2, graphData)
    );
  };
}

export function getFieldDistFromEndNode(
  field: FieldM,
  { endNode }: GraphDataHere
): number {
  // return Math.abs(field.y - endNode.y + 1) + Math.abs(field.x - endNode.x + 1);
  return parseFloat(
    Math.sqrt(
      Math.pow(Math.abs(field.y - endNode.y), 2) +
        Math.pow(Math.abs(field.x - endNode.x), 2)
    ).toPrecision(2)
  );
}

function getEmptyVisitedNodes(
  graph: GraphHere,
  startNode: FieldM
): VisitedNodesHere {
  const visitedNodes = new Array(graph.length)
    .fill(null)
    .map(() => new Array(graph[0].length).fill(null));
  visitedNodes[startNode.y][startNode.x] = START_NODE_SIGN;
  return visitedNodes;
}

function isNodeVisited(node: FieldM, visitedNodes: VisitedNodesHere): boolean {
  return !(visitedNodes[node.y][node.x] === null);
}

function markNodeAsVisited(
  node: FieldM,
  nodeVisitedFrom: FieldM,
  visitedNodes: VisitedNodesHere
): void {
  visitedNodes[node.y][node.x] = nodeVisitedFrom;
}

function getAdjacentNodes(currNode: FieldM, graph: GraphHere) {
  const directions = [
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ];
  return directions
    .map(dir => {
      return { x: currNode.x + dir.x, y: currNode.y + dir.y };
    })
    .filter(node => isNodeInBounds(node, graph));
}

function isNodeInBounds(node: FieldM, graph: GraphHere): boolean {
  return (
    node.x >= 0 &&
    node.x < graph.length &&
    node.y >= 0 &&
    node.y < graph[0].length
  );
}

function isFieldEmpty(field: FieldM, graph: GraphHere) {
  return graph[field.y][field.x] === NodeTypesM.empty;
}

function isNodeEndNode(node: FieldM, endNode: FieldM) {
  return node.x === endNode.x && node.y === endNode.y;
}

function dijkstarasAlgorithm(graphData: GraphDataHere): {
  visitedNodes: VisitedNodesHere;
  listOfSteps: FieldM[];
} {
  const listOfSteps: FieldM[] = [];
  const { graph, startNode, endNode } = graphData;

  // Two algorithms in one beacouse there's only one change (stack.pop() or stack.shift)
  const pq = new PriorityQueue<FieldM>(getPQFun(graphData), [startNode]);
  const visitedNodes = getEmptyVisitedNodes(graph, startNode);
  // Search through the graph. Collect data: data.isEndNodeReached, data.listOfSteps and fill visitedNodes
  while (!pq.isEmpty()) {
    const currNode = pq.poll() as FieldM;
    listOfSteps.push(currNode);
    for (const neighborNode of getAdjacentNodes(currNode, graph)) {
      if (!isNodeVisited(neighborNode, visitedNodes)) {
        if (isNodeEndNode(neighborNode, endNode)) {
          listOfSteps.push(neighborNode);
          markNodeAsVisited(neighborNode, currNode, visitedNodes);
          listOfSteps.shift();
          return { listOfSteps, visitedNodes };
        }
        if (isFieldEmpty(neighborNode, graph)) {
          pq.insert(neighborNode);
          markNodeAsVisited(neighborNode, currNode, visitedNodes);
        }
      }
    }
  }
  listOfSteps.shift();
  return { listOfSteps, visitedNodes };
}

function backtrackToStartNode(
  { endNode }: GraphDataHere,
  data: SearchExecutionDataHere,
  visitedNodes: VisitedNodesHere
): void {
  // fills data.pathToEndNode and data.pathCost
  const eNode = endNode;
  data.pathToEndNode = [eNode];
  data.pathCost = 0;
  let at = visitedNodes[eNode.y][eNode.x];
  while (at !== START_NODE_SIGN && at !== null) {
    // at!==null just for type safety
    data.pathToEndNode.push(at as FieldM);
    data.pathCost++;
    at = visitedNodes[at.y][at.x];
  }
  data.pathToEndNode.pop();
  data.pathToEndNode.reverse();
}

const dijkstras: SearchAlgorithmFunHere = function (
  graphData: GraphDataHere
): SearchExecutionDataHere {
  const { listOfSteps, visitedNodes } = dijkstarasAlgorithm(graphData);
  const algorithmData = getEmptySearchData(
    SearchAlgorithmsTypes.Dijkstras
  ) as SearchExecutionDataHere;

  algorithmData.listOfSteps = listOfSteps;
  algorithmData.isEndNodeReached =
    visitedNodes[graphData.endNode.y][graphData.endNode.x] !== null;
  if (algorithmData.isEndNodeReached) {
    backtrackToStartNode(graphData, algorithmData, visitedNodes);
  }
  return algorithmData;
};

export { dijkstras };
