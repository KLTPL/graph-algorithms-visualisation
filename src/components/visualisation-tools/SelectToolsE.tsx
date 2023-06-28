import { VisualisationPointerTools as Tools } from "./VisualisationTools";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind-config";
import { NODE_SIZE_PX } from "../visualisation-container/nodes/NodeE";
import ToolRadioInput from "./ToolRadioInput";

const twConfig = resolveConfig(tailwindConfig);

const CONTENT_NEW_NODE = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill={twConfig.theme.colors.black}
    className="bi bi-plus-lg"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
    />
  </svg>
);
const CONTENT_REMOVE = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="red"
    viewBox="0 0 16 16"
  >
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
  </svg>
);

const CONTENT_NEW_EDGE = [
  <div
    key={"edge"}
    style={{ width: NODE_SIZE_PX }}
    className="bg-black h-2"
  ></div>,
  <div
    key={"coverSoTheEdgeDoesntLookLikeARectangle"}
    style={{ width: NODE_SIZE_PX, height: NODE_SIZE_PX }}
    className="bg-none w-full h-full border-solid border-2 border-nodeBorder absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
  ></div>,
];

export default function SelectToolsE() {
  return (
    <div className="flex flex-col gap-3">
      <ToolRadioInput
        className="bg-nodeEmpty"
        title="new node"
        newPointerTool={Tools.NewNode}
        content={CONTENT_NEW_NODE}
      />
      <ToolRadioInput
        className="bg-white"
        title="new edge"
        newPointerTool={Tools.NewEdge}
        content={CONTENT_NEW_EDGE}
      />
      <ToolRadioInput
        className="bg-white"
        title="remove node or edge"
        newPointerTool={Tools.RemoveEdgeOrNode}
        content={CONTENT_REMOVE}
      />
    </div>
  );
}
