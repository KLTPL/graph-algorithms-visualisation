import { VisualisationDataContextProps, useVisualisationData } from "../SettingsContext";
import { UserGraphTypes } from "../visualisationData/graphDataSets/allGraphData";

export default function GraphSettingsSelectType() {
  const visualisationDataContext = useVisualisationData() as VisualisationDataContextProps;
  const { visualisationData, switchVisualisationData } = visualisationDataContext;
  function selectGraphType(graphType: UserGraphTypes): () => void {
    return () => {
      if (visualisationData.graphType !== graphType) {
        switchVisualisationData(graphType, visualisationData.algorithmType);
      }
    };
  }

  return (
    <div className="flex flex-col">
      <h3>Graph type:</h3>
      <button onClick={selectGraphType(UserGraphTypes.matrix)}>
        matrix graph
      </button>
      <button onClick={selectGraphType(UserGraphTypes.directed)}>
        directed graph
      </button>
      <button onClick={selectGraphType(UserGraphTypes.directedWeighted)}>
        directed weighted graph
      </button>
      <button onClick={selectGraphType(UserGraphTypes.undirected)}>
        undirected graph
      </button>
      <button onClick={selectGraphType(UserGraphTypes.undirectedWeighted)}>
        undirected weighted graph
      </button>
      { visualisationData.graphType }
    </div>
  );
}