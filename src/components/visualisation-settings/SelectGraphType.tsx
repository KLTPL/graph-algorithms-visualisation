import { useVisualisationData } from "../../context/Context";
import { SearchAlgorithmsTypes } from "../../visualisationData/typesAlgorithmData";
import { UserGraphTypes } from "../../visualisationData/typesGraphData";
import SelectButton from "./SelectButton";

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
          optionName="matrix graph"
          optionType={UserGraphTypes.M}
          currOptionType={visualisationData.graphType}
          switchFun={switchGraphType}
        />
        <SelectButton
          optionName="directed graph"
          optionType={UserGraphTypes.D}
          currOptionType={visualisationData.graphType}
          switchFun={switchGraphType}
        />
        <SelectButton
          optionName="directed weighted graph"
          optionType={UserGraphTypes.DW}
          currOptionType={visualisationData.graphType}
          switchFun={switchGraphType}
        />
        <SelectButton
          optionName="undirected graph"
          optionType={UserGraphTypes.U}
          currOptionType={visualisationData.graphType}
          switchFun={switchGraphType}
        />
        <SelectButton
          optionName="undirected weighted graph"
          optionType={UserGraphTypes.UW}
          currOptionType={visualisationData.graphType}
          switchFun={switchGraphType}
        />
      </div>
    </div>
  );
}
