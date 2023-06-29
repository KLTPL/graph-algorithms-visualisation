import SelectAlgorithmType from "./SelectAlgorithmType";
import SelectGraphType from "./SelectGraphType";

export default function GraphSettings() {
  return (
    <div className="mb-8 mt-6">
      <SelectGraphType />
      <SelectAlgorithmType />
    </div>
  );
}
