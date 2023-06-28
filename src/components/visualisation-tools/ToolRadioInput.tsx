import {
  useVisualisationData,
  useVisualisationPointerTools,
} from "../../context/Context";
import { UserGraphTypes } from "../../visualisationData/typesGraphData";
import { NODE_SIZE_PX } from "../visualisation-container/nodes/NodeE";
import { VisualisationPointerTools as Tools } from "./VisualisationTools";

const DEFAULT_CLASS_NAME_M =
  "w-[50px] aspect-square border-solid border-2 border-nodeBorder text-black rounded-xl grid place-content-center font-semibold";
const DEFAULT_CLASS_NAME_E =
  "aspect-square border-solid border-2 border-nodeBorder text-black rounded-full font-semibold flex items-center justify-center relative";

interface ToolBoxProps {
  className: string;
  title: string;
  newPointerTool: Tools;
  content?: string | JSX.Element | JSX.Element[];
}

export default function ToolRadioInput({
  className,
  title,
  newPointerTool,
  content,
}: ToolBoxProps) {
  const { visualisationData } = useVisualisationData();
  const { pointerTool, updatePointerTool, setPointerToolToDefault } =
    useVisualisationPointerTools();
  const defaultClassName =
    visualisationData.graphType === UserGraphTypes.M
      ? DEFAULT_CLASS_NAME_M
      : DEFAULT_CLASS_NAME_E;
  function handleOnClick() {
    if (newPointerTool === pointerTool) {
      setPointerToolToDefault();
    } else {
      updatePointerTool(newPointerTool);
    }
  }
  return (
    <button
      style={{ width: NODE_SIZE_PX }}
      className={[defaultClassName, className].join(" ")}
      title={title}
      onClick={handleOnClick}
    >
      {content}
    </button>
  );
}
