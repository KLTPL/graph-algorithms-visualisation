import GraphSettingsSelectSearchType from "./GraphSettingsSelectSortType";
import GraphSettingsSelectType from "./GraphSettingsSelectType";

export default function GraphSettings() {

  return (
    <div className="">
        <GraphSettingsSelectType />
        <GraphSettingsSelectSearchType />
    </div>
  );
}