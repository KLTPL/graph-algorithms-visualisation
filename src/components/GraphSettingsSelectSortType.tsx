import { useVisualisationData } from "../SettingsContext";
import { SearchAlgorithmsTypes } from "../visualisationData/searchAlgorithms/allAlgorithmData";

export default function GraphSettingsSelectSearchType() {
  const visualisationDataContext = useVisualisationData();

  function selectAlgorithmType(algorithmType: SearchAlgorithmsTypes): () => void {
    return () => {
      if (
        visualisationDataContext !== null && 
        visualisationDataContext.graphAndAlgorithm.algorithmData.type !== algorithmType
      ) {
        const { graphAndAlgorithm, updateGraphAndAlgorithm } = visualisationDataContext;
        updateGraphAndAlgorithm(graphAndAlgorithm.graphData.type, algorithmType);
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
      { visualisationDataContext?.graphAndAlgorithm.algorithmData.type }
    </div>
  );
}