import { useVisualisationData } from "../../context/Context";
import { SearchAlgorithmsTypes } from "../../visualisationData/typesAlgorithmData";
import { UserGraphTypes } from "../../visualisationData/typesGraphData";
import SelectButton from "./SelectButton";

export function userGraphTypeToName(graphType: UserGraphTypes): string {
  switch (graphType) {
    case UserGraphTypes.M:
      return "matrix graph";
    case UserGraphTypes.D:
      return "directed graph";
    case UserGraphTypes.DW:
      return "directed weighted graph";
    case UserGraphTypes.U:
      return "undirected graph";
    case UserGraphTypes.UW:
      return "undirected weighted graph";
  }
}

export default function SelectGraphType() {
  const { visualisationData, switchVisualisationData } = useVisualisationData();
  function switchGraphType(
    newGraphType: UserGraphTypes | SearchAlgorithmsTypes
  ) {
    switchVisualisationData(
      newGraphType as UserGraphTypes,
      visualisationData.algorithmType
    );
  }
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-h3">Graph type:</h3>
      <div className="flex flex-wrap justify-center gap-1">
        <SelectButton
          optionName={userGraphTypeToName(UserGraphTypes.M)}
          optionType={UserGraphTypes.M}
          currOptionType={visualisationData.graphType}
          switchFun={switchGraphType}
        />
        <SelectButton
          optionName={userGraphTypeToName(UserGraphTypes.D)}
          optionType={UserGraphTypes.D}
          currOptionType={visualisationData.graphType}
          switchFun={switchGraphType}
        />
        <SelectButton
          optionName={userGraphTypeToName(UserGraphTypes.DW)}
          optionType={UserGraphTypes.DW}
          currOptionType={visualisationData.graphType}
          switchFun={switchGraphType}
        />
        <SelectButton
          optionName={userGraphTypeToName(UserGraphTypes.U)}
          optionType={UserGraphTypes.U}
          currOptionType={visualisationData.graphType}
          switchFun={switchGraphType}
        />
        <SelectButton
          optionName={userGraphTypeToName(UserGraphTypes.UW)}
          optionType={UserGraphTypes.UW}
          currOptionType={visualisationData.graphType}
          switchFun={switchGraphType}
        />
      </div>
    </div>
  );
}
