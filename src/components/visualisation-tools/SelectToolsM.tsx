import { VisualisationPointerTools as Tools } from "./VisualisationTools";
import ToolRadioInput from "./ToolRadioInput";

export default function SelectToolsM() {
  return (
    <>
      <ToolRadioInput
        customClassName="bg-nodeEmpty"
        title="empty field"
        newPointerTool={Tools.EmptyField}
      />
      <ToolRadioInput
        customClassName="bg-nodeRock"
        title="rock field"
        newPointerTool={Tools.RockField}
      />
      <ToolRadioInput
        customClassName="bg-nodeStartOrEnd"
        title="start field"
        newPointerTool={Tools.StartField}
        content="S"
      />
      <ToolRadioInput
        customClassName="bg-nodeStartOrEnd"
        title="end field"
        newPointerTool={Tools.EndField}
        content="E"
      />
    </>
  );
}
