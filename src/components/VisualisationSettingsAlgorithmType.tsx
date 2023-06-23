import { useVisualisationData } from "../SettingsContext";
import { SearchAlgorithmsTypes } from "../visualisationData/typesAlgorithmData";

export default function GraphSettingsSelectSearchType() {
  const visualisationDataContext = useVisualisationData();

  function getSelectAlgorithmTypeFun(
    algorithmType: SearchAlgorithmsTypes
  ): () => void {
    return () => {
      if (
        visualisationDataContext.visualisationData.algorithmType !==
        algorithmType
      ) {
        const { visualisationData, switchVisualisationData } =
          visualisationDataContext;
        switchVisualisationData(visualisationData.graphType, algorithmType);
      }
    };
  }

  return (
    <div className="flex flex-col">
      <h3>Search algorithm type:</h3>
      <button onClick={getSelectAlgorithmTypeFun(SearchAlgorithmsTypes.Dfs)}>
        dfs
      </button>
      <button onClick={getSelectAlgorithmTypeFun(SearchAlgorithmsTypes.Bfs)}>
        bfs
      </button>
      {visualisationDataContext.visualisationData.algorithmType}
    </div>
  );
}
