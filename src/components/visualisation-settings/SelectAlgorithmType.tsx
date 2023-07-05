import { useVisualisationData } from "../../context/Context";
import { SearchAlgorithmsTypes } from "../../visualisationData/typesAlgorithmData";
import { UserGraphTypes } from "../../visualisationData/typesGraphData";
import SelectButton from "./SelectButton";

export function searchAlgorithmTypeToName(algorithmType: SearchAlgorithmsTypes): string {
  switch (algorithmType) {
    case SearchAlgorithmsTypes.Dfs:
      return "dfs";
    case SearchAlgorithmsTypes.Bfs:
      return "bfs";
  }
}

export default function SelectAlgorithmType() {
  const { visualisationData, switchVisualisationData } = useVisualisationData();

  function switchAlgorithmType(
    newAlgorithmType: UserGraphTypes | SearchAlgorithmsTypes
  ) {
    switchVisualisationData(
      visualisationData.graphType,
      newAlgorithmType as SearchAlgorithmsTypes
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-h3">Search algorithm type:</h3>
      <div className="flex flex-wrap justify-center gap-1">
        <SelectButton
          optionName={searchAlgorithmTypeToName(SearchAlgorithmsTypes.Dfs)}
          optionType={SearchAlgorithmsTypes.Dfs}
          currOptionType={visualisationData.algorithmType}
          switchFun={switchAlgorithmType}
        />
        <SelectButton
          optionName={searchAlgorithmTypeToName(SearchAlgorithmsTypes.Bfs)}
          optionType={SearchAlgorithmsTypes.Bfs}
          currOptionType={visualisationData.algorithmType}
          switchFun={switchAlgorithmType}
        />
      </div>
    </div>
  );
}
