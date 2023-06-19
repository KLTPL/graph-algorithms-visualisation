import GraphSettingsSelectSearchType from "./VisualisationSettingsAlgorithmType";
import GraphSettingsSelectType from "./VisualisationSettingsGraphType";

export default function GraphSettings() {

  return (
    <div className="">
      <GraphSettingsSelectType />
      <GraphSettingsSelectSearchType />
    </div>
  );
}