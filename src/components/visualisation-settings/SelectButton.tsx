import { SearchAlgorithmsTypes } from "../../visualisationData/typesAlgorithmData";
import { UserGraphTypes } from "../../visualisationData/typesGraphData";
import tailwindConfig from "tailwind-config";
import resolveConfig from "tailwindcss/resolveConfig";

const twConfig = resolveConfig(tailwindConfig);

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
            ? twConfig.theme.colors.primary
            : twConfig.theme.colors.nodeBorder,
      }}
      onClick={() => {
        switchFun(optionType);
      }}
    >
      {optionName}
    </button>
  );
}
