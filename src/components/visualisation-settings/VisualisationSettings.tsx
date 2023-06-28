import SelectAlgorithmType from "./SelectAlgorithmType";
import SelectGraphType from "./SelectGraphType";

export default function GraphSettings() {
  return (
    <div className="">
      <SelectGraphType />
      <SelectAlgorithmType />
    </div>
  );
}
