import { useVisualisationData } from "../../context/Context";
import {
  FieldM,
  NodeEStartOrEnd,
  UserGraphTypes,
} from "../../visualisationData/typesGraphData";
import { searchAlgorithmTypeToName } from "../visualisation-settings/SelectAlgorithmType";
import { userGraphTypeToName } from "../visualisation-settings/SelectGraphType";
import { nodeNumToChar } from "./element-components/nodeE/NodeE";

interface SummaryProps {
  setIsSummaryDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}

function getNodeToDisplayStartOrEnd(
  graphType: UserGraphTypes,
  nodeStartOrEnd: FieldM | NodeEStartOrEnd
): string {
  if (graphType === UserGraphTypes.M) {
    const nodeTemp = nodeStartOrEnd as FieldM;
    return `x: ${nodeTemp.x}; y: ${nodeTemp.y}`;
  } else {
    const nodeTemp = nodeStartOrEnd as NodeEStartOrEnd;
    return nodeNumToChar(nodeTemp.current);
  }
}

export default function Summary({ setIsSummaryDisplayed }: SummaryProps) {
  const { graphType, startNode, endNode, algorithmType, pathCost } =
    useVisualisationData().visualisationData;
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-bg2 z-50 flex flex-col items-center text-white p-3 rounded-lg">
      <button
        className="aspect-square w-10 h-10 absolute right-0 top-0 font-bold"
        onClick={() => setIsSummaryDisplayed(false)}
      >
        -
      </button>
      <h3 className="text-h3">Summary:</h3>
      <ul className="flex flex-col w-full text-center">
        <li className="grid grid-cols-2 grid-rows-1">
          <div>Graph Type:</div>
          <div>{userGraphTypeToName(graphType)}</div>
        </li>
        <li className="grid grid-cols-2 grid-rows-1">
          <div>Algorighm Type:</div>
          <div>{searchAlgorithmTypeToName(algorithmType)}</div>
        </li>
        <li className="grid grid-cols-2 grid-rows-1">
          <div>Start Node:</div>
          <div>{getNodeToDisplayStartOrEnd(graphType, startNode)}</div>
        </li>
        <li className="grid grid-cols-2 grid-rows-1">
          <div>End Node:</div>
          <div>{getNodeToDisplayStartOrEnd(graphType, endNode)}</div>
        </li>
        <li className="grid grid-cols-2 grid-rows-1">
          <div>Path cost:</div>
          <div>{pathCost}</div>
        </li>
      </ul>
    </div>
  );
}
