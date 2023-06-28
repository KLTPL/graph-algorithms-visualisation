import { useVisualisationPointerTools } from "../../context/Context";
import { VisualisationPointerToolsM as Tools } from "./VisualisationTools";

export default function SelectToolsM() {
  return (
    <div className="flex flex-col gap-3">
      <ToolBox
        className="bg-nodeEmpty"
        title="empty field"
        newPointerTool={Tools.EmptyField}
      />
      <ToolBox
        className="bg-nodeRock" 
        title="rock field"
        newPointerTool={Tools.RockField}
      />
      <ToolBox
        className="bg-nodeStartOrEnd"
        title="start field"
        newPointerTool={Tools.StartField}
        content="S"
      />
      <ToolBox
        className="bg-nodeStartOrEnd"
        title="end field"
        newPointerTool={Tools.EndField}
        content="E"
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
        "w-[50px] aspect-square border-solid border-2 border-nodeBorder text-black rounded-xl grid place-content-center font-semibold",
        className,
      ].join(" ")}
      title={title}
      onClick={() => updatePointerTool(newPointerTool)}
    >
      {content}
    </button>
  );
}
