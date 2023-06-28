import { VisualisationPointerTools as Tools } from "./VisualisationTools";
import ToolRadioInput from "./ToolRadioInput";

export default function SelectToolsM() {
  return (
    <div className="flex flex-col gap-3">
      <ToolRadioInput
        className="bg-nodeEmpty"
        title="empty field"
        newPointerTool={Tools.EmptyField}
      />
      <ToolRadioInput
        className="bg-nodeRock"
        title="rock field"
        newPointerTool={Tools.RockField}
      />
      <ToolRadioInput
        className="bg-nodeStartOrEnd"
        title="start field"
        newPointerTool={Tools.StartField}
        content="S"
      />
      <ToolRadioInput
        className="bg-nodeStartOrEnd"
        title="end field"
        newPointerTool={Tools.EndField}
        content="E"
      />
    </div>
  );
}
