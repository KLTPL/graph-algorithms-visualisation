import { useVisualisationData } from "../SettingsContext";
import { UserGraphTypes } from "../visualisationData/graphDataSets/allGraphData";

export default function GraphSettingsSelectType() {
  const visualisationDataContext = useVisualisationData();

  function selectGraphType(graphType: UserGraphTypes): () => void {
    return () => {
      if (
        visualisationDataContext !== null &&
        visualisationDataContext.graphAndAlgorithm.graphData.type !== graphType
      ) {
        const { graphAndAlgorithm, updateGraphAndAlgorithm } = visualisationDataContext;
        updateGraphAndAlgorithm(graphType, graphAndAlgorithm.algorithmData.type);
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
      { visualisationDataContext?.graphAndAlgorithm.graphData.type }
    </div>
  );
}