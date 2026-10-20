import { SearchAlgorithmsTypes } from "../../visualisationData/typesAlgorithmData";
import { UserGraphTypes } from "../../visualisationData/typesGraphData";

interface SelectButtonProps {
  optionName: string;
  optionType: UserGraphTypes | SearchAlgorithmsTypes;
  currOptionType: UserGraphTypes | SearchAlgorithmsTypes;
  switchFun: (newOption: UserGraphTypes | SearchAlgorithmsTypes) => void;
}

export default function SelectButton({
  optionName,
  optionType,
  currOptionType,
  switchFun,
}: SelectButtonProps) {
  return (
    <button
      className="ps-3 pe-3 pt-1 pb-1 bg-nodeBorder rounded-lg text-white font-semibold border-2"
      style={{
        borderColor:
          optionType === currOptionType
            ? "var(--color-primary)"
            : "var(--color-nodeBorder)",
      }}
      onClick={() => {
        switchFun(optionType);
      }}
    >
      {optionName}
    </button>
  );
}
