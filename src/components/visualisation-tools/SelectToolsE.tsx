import { useVisualisationPointerTools } from "../../context/Context";
import { VisualisationPointerToolsE as Tools } from "./VisualisationTools";

const svgRemove = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="black"
    className="bi bi-x-lg"
    viewBox="0 0 16 16"
  >
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
  </svg>
);

export default function SelectToolsE() {
  return (
    <div className="flex flex-col gap-3">
      <ToolBox
        className="bg-nodeEmpty"
        title="new node"
        newPointerTool={Tools.NewNode}
      />
      <ToolBox
        className="bg-white"
        title="new edge"
        newPointerTool={Tools.NewEdge}
      />
      <ToolBox
        className="bg-white"
        title="remove node"
        newPointerTool={Tools.Remove}
        content={svgRemove}
      />
    </div>
  );
}

interface ToolBoxProps {
  className: string;
  title: string;
  newPointerTool: Tools;
  content?: string | JSX.Element;
}

function ToolBox({ className, title, newPointerTool, content }: ToolBoxProps) {
  const { updatePointerTool } = useVisualisationPointerTools();
  return (
    <button
      className={[
        "w-[50px] aspect-square border-solid border-2 border-nodeBorder text-black rounded-full grid place-content-center font-semibold",
        className,
      ].join(" ")}
      title={title}
      onClick={() => updatePointerTool(newPointerTool)}
    >
      {content}
    </button>
  );
}
