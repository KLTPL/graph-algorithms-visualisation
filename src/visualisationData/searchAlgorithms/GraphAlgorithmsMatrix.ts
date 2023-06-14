import { getEmptySearchData } from "../getProperDataFunctions";
import { FieldMatrixGraph, FieldTypesMatrixGraph, MatrixGraph, GraphDataMatrix as GraphDataHere } from "../graphDataSets/allGraphData";
import { VisitedNodesMatrixGraph as VisitedNodesHere, SearchAlgorithmFunMatrix as SearchAlgorithmFunHere, SearchExecutionDataMatrixGraph as SearchExecutionDataHere, VisitedNodesStartNode, SearchAlgorithmsFunsMatrix, SearchAlgorithmsTypes } from "./allAlgorithmData";

const START_NODE_SIGN: VisitedNodesStartNode = true;

function isNodeVisited(node: FieldMatrixGraph, visitedNodes: VisitedNodesHere): boolean {
  return !(visitedNodes[node.y][node.x] === null);
}

function markNodeAsVisited(node: FieldMatrixGraph, nodeVisitedFrom: FieldMatrixGraph, visitedNodes: VisitedNodesHere): void {
  visitedNodes[node.y][node.x] = nodeVisitedFrom;
}

function isNodeEndNode(node: FieldMatrixGraph, endNode: FieldMatrixGraph) {
  return node.x === endNode.x && node.y === endNode.y;
}

function getEmptyVisitedNodes(graph: MatrixGraph, startNode: FieldMatrixGraph): VisitedNodesHere {
  const visitedNodes = new Array(graph.length).fill(null).map(() => new Array(graph[0].length).fill(null));
  visitedNodes[startNode.y][startNode.x] = START_NODE_SIGN;
  return visitedNodes;
}

function getAdjacentNodes(currNode: FieldMatrixGraph, graph: MatrixGraph) {
  const directions = [ { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 } ];
  return (
    directions.map(dir => { return {x: currNode.x + dir.x, y: currNode.y + dir.y }})
    .filter(node => isNodeInBounds(node, graph))
  );
}

function isNodeInBounds(node: FieldMatrixGraph, graph: MatrixGraph): boolean {
  return node.x >= 0 && node.x < graph.length && node.y >= 0 && node.y < graph[0].length
}

function isFieldEmpty(field: FieldMatrixGraph, graph: MatrixGraph) {
  return graph[field.y][field.x] === FieldTypesMatrixGraph.empty;
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
    const currNode = ((isDfs) ? stack.pop() : stack.shift()) as FieldMatrixGraph;
    algorithmData.listOfSteps.push(currNode);
    for (const neighborNode of getAdjacentNodes(currNode, graphData.graph)) {
      if (isNodeEndNode(neighborNode, graphData.endNode)) {
        algorithmData.isEndNodeReached = true;
        markNodeAsVisited(neighborNode, currNode, visitedNodes);
        break;
      }
      if (!isNodeVisited(neighborNode, visitedNodes) && isFieldEmpty(neighborNode, graphData.graph)) {
        stack.push(neighborNode);
        markNodeAsVisited(neighborNode, currNode, visitedNodes);
      }
    }
  }
  algorithmData.listOfSteps.shift();

  // Use visitedNodes to backtrack to the starNode and reverse the order to get data.pathToEndNode. Also cout data.pathCost (data.pathToEndNode.length).
  if (algorithmData.isEndNodeReached) {
    backtrackToStartNode(graphData, algorithmData, visitedNodes);
  }
  return algorithmData;
}

function backtrackToStartNode(graphData: GraphDataHere, data: SearchExecutionDataHere, visitedNodes: VisitedNodesHere): void { // fills data.pathToEndNode and data.pathCost
  const eNode = graphData.endNode;
  data.pathToEndNode = [ eNode ];
  data.pathCost = 0;
  let at = visitedNodes[eNode.y][eNode.x];
  while (at !== START_NODE_SIGN && at !== null) { // at!==null just for type safety 
    data.pathToEndNode.push(at as FieldMatrixGraph);
    data.pathCost++;
    at = visitedNodes[at.y][at.x]
  }
  data.pathToEndNode.pop();
  data.pathToEndNode.reverse();
}

const dfs: SearchAlgorithmFunHere = function(graphData: GraphDataHere): SearchExecutionDataHere {
  return dfsOrBfs(graphData, true);
}

const bfs: SearchAlgorithmFunHere = function(graphData: GraphDataHere): SearchExecutionDataHere {
  return dfsOrBfs(graphData, false);
}

const searchAlgorithmsFunsDW: SearchAlgorithmsFunsMatrix = { dfs, bfs };

export default searchAlgorithmsFunsDW;