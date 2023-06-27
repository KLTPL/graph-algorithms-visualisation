import { useVisualisationData } from "../SettingsContext";
import { UserGraphTypes } from "../visualisationData/typesGraphData";

export default function GraphSettingsSelectType() {
  const { visualisationData, switchVisualisationData } = useVisualisationData();
  function selectGraphType(graphType: UserGraphTypes): () => void {
    return () => {
      switchVisualisationData(graphType, visualisationData.algorithmType);
    };
  }

  return (
    <div className="flex flex-col">
      <h3>Graph type:</h3>
      <button onClick={selectGraphType(UserGraphTypes.M)}>matrix graph</button>
      <button onClick={selectGraphType(UserGraphTypes.D)}>
        directed graph
      </button>
      <button onClick={selectGraphType(UserGraphTypes.DW)}>
        directed weighted graph
      </button>
      <button onClick={selectGraphType(UserGraphTypes.U)}>
        undirected graph
      </button>
      <button onClick={selectGraphType(UserGraphTypes.UW)}>
        undirected weighted graph
      </button>
      {visualisationData.graphType}
    </div>
  );
}
