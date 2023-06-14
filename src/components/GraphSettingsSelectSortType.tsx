import { useVisualisationData } from "../SettingsContext";
import { SearchAlgorithmsTypes } from "../visualisationData/searchAlgorithms/allAlgorithmData";

export default function GraphSettingsSelectSearchType() {
  const visualisationDataContext = useVisualisationData();

  function selectAlgorithmType(algorithmType: SearchAlgorithmsTypes): () => void {
    return () => {
      if (visualisationDataContext !== null) {
        const { visualisationData, updateVisualisationData } = visualisationDataContext;
        updateVisualisationData(visualisationData.graphData.type, algorithmType);
      }
    };
  }

  return (
    <div className="flex flex-col">
      <h3>Search algorithm type:</h3>
      <button onClick={selectAlgorithmType(SearchAlgorithmsTypes.dfs)}>
        dfs
      </button>
      <button onClick={selectAlgorithmType(SearchAlgorithmsTypes.bfs)}>
        bfs
      </button>
      { visualisationDataContext?.visualisationData.algorithmData.type }
    </div>
  );
}