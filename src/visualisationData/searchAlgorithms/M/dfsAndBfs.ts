import { getEmptySearchData } from "../../getProperDataFunctions";
import {
  FieldM,
  NodeTypesM,
  GraphM,
  GraphDataM as GraphDataHere,
} from "../../typesGraphData";
import {
  SearchAlgorithmFunM as SearchAlgorithmFunHere,
  SearchExecutionDataM as SearchExecutionDataHere,
  VisitedNodesStartNode,
  SearchAlgorithmsTypes,
} from "../../typesAlgorithmData";

// true - startNode null - not visited or startNode; FieldMatrixGraph - field was visited from
type VisitedNodesHere = (VisitedNodesStartNode | null | FieldM)[][];
const START_NODE_SIGN: VisitedNodesStartNode = true;

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

function isNodeEndNode(node: FieldM, endNode: FieldM) {
  return node.x === endNode.x && node.y === endNode.y;
}

function getEmptyVisitedNodes(
  graph: GraphM,
  startNode: FieldM
): VisitedNodesHere {
  const visitedNodes = new Array(graph.length)
    .fill(null)
    .map(() => new Array(graph[0].length).fill(null));
  visitedNodes[startNode.y][startNode.x] = START_NODE_SIGN;
  return visitedNodes;
}

function getAdjacentNodes(currNode: FieldM, graph: GraphM) {
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

function isNodeInBounds(node: FieldM, graph: GraphM): boolean {
  return (
    node.x >= 0 &&
    node.x < graph[0].length &&
    node.y >= 0 &&
    node.y < graph.length
  );
}

function isFieldEmpty(field: FieldM, graph: GraphM) {
  return graph[field.y][field.x] === NodeTypesM.empty;
}

function getGetCurrNodeFun(isDfs: boolean): (stack: FieldM[]) => FieldM {
  return isDfs
    ? (stack: FieldM[]) => stack.pop() as FieldM
    : (stack: FieldM[]) => stack.shift() as FieldM;
}

function dfsOrBfsAlgorithm(
  graphData: GraphDataHere,
  isDfs: boolean
): {
  visitedNodes: VisitedNodesHere;
  listOfSteps: FieldM[];
} {
  const listOfSteps: FieldM[] = [];
  const { graph, startNode, endNode } = graphData;

  // Two algorithms in one beacouse there's only one change (stack.pop() or stack.shift)
  const stack = [startNode];
  const visitedNodes = getEmptyVisitedNodes(graph, startNode);
  const getCurrNode = getGetCurrNodeFun(isDfs);
  // Search through the graph. Collect data: data.isEndNodeReached, data.listOfSteps and fill visitedNodes
  while (stack.length > 0) {
    const currNode = getCurrNode(stack);
    listOfSteps.push(currNode);
    for (const neighborNode of getAdjacentNodes(currNode, graph)) {
      if (isNodeEndNode(neighborNode, endNode)) {
        listOfSteps.push(neighborNode);
        markNodeAsVisited(neighborNode, currNode, visitedNodes);
        listOfSteps.shift();
        return { listOfSteps, visitedNodes };
      }
      if (
        isFieldEmpty(neighborNode, graph) &&
        !isNodeVisited(neighborNode, visitedNodes)
      ) {
        stack.push(neighborNode);
        markNodeAsVisited(neighborNode, currNode, visitedNodes);
      }
    }
  }
  listOfSteps.shift();
  return { listOfSteps, visitedNodes };
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
  algorithmData.isEndNodeReached = visitedNodes[graphData.endNode.y][graphData.endNode.x] !== null;
  if (algorithmData.isEndNodeReached) {
    backtrackToStartNode(graphData, algorithmData, visitedNodes);
  }
  return algorithmData;
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

export { dfs, bfs };
