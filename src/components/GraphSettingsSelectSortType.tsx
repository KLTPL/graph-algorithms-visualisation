import { useSearchAlgorithmType } from "../SettingsContext";
import { SearchAlgorithmsTypes } from "../searchAlgorithms/allAlgorithmData";

export default function GraphSettingsSelectSearchType() {
  const graphTypeContext = useSearchAlgorithmType();

  return (
    <div className="flex flex-col">
      <h3>Search algorithm type:</h3>
      <button onClick={() => graphTypeContext?.updateType(SearchAlgorithmsTypes.dfs)}>
        dfs
      </button>
      <button onClick={() => graphTypeContext?.updateType(SearchAlgorithmsTypes.bfs)}>
        bfs
      </button>
      { graphTypeContext?.type }
    </div>
  );
}