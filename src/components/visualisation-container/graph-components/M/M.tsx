import { useVisualisationData } from "../../../../context/Context";
import { VisualisationDataM } from "../../../../visualisationData/typesVisualisationData";
import NodeMatrix from "../../element-components/nodeM/NodeM";
import { addColEnd, addColStart, addRowEnd, addRowStart } from "./addRowOrCol";
import {
  removeColEnd,
  removeColStart,
  removeRowEnd,
  removeRowStart,
} from "./removeRowOrCol";

export default function Matrix({ backtrackCount }: { backtrackCount: number }) {
  const { visualisationData: AnyVisualisationData, refreshVisualisationData } =
    useVisualisationData();
  const visualisationData = AnyVisualisationData as VisualisationDataM;

  function getField(r: number, c: number): JSX.Element {
    return (
      <NodeMatrix
        key={`${r};${c}`}
        backtrackCount={backtrackCount}
        r={r}
        c={c}
      />
    );
  }

  return (
    // the grid is styled so every node has the border on top and right side and the grid has the border only on the left and bottom
    <div
      style={{
        gridTemplateColumns: `repeat(${visualisationData.graph[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${visualisationData.graph.length}, 1fr)`,
      }}
      className="w-[90%] grid max-w-[500px] bg-nodeBorder border-solid border-s-[2px] border-b-[2px] border-nodeBorder relative m-5"
    >
      {visualisationData.graph.map((row, r) =>
        row.map((fieldType, c) => getField(r, c))
      )}
      <div // top
        className="absolute w-full h-4 left-0 bottom-full flex"
        onClick={refreshVisualisationData}
      >
        <button
          className="w-1/2 h-full bg-nodeRock"
          onClick={() => addRowStart(visualisationData)}
        />
        <button
          className="w-1/2 h-full bg-red-500"
          onClick={() => removeRowStart(visualisationData)}
        />
      </div>
      <div // bottom
        className="absolute w-full h-4 left-0 top-full flex"
        onClick={refreshVisualisationData}
      >
        <button
          className="w-1/2 h-full bg-red-500"
          onClick={() => removeRowEnd(visualisationData)}
        />
        <button
          className="w-1/2 h-full bg-nodeRock"
          onClick={() => addRowEnd(visualisationData)}
        />
      </div>
      <div // left
        className="absolute w-4 h-full right-full top-0 flex flex-col"
        onClick={refreshVisualisationData}
      >
        <button
          className="w-full h-full bg-red-500"
          onClick={() => removeColStart(visualisationData)}
        />
        <button
          className="w-full h-full bg-nodeRock"
          onClick={() => addColStart(visualisationData)}
        />
      </div>
      <div // right
        className="absolute w-4 h-full left-full top-0 flex flex-col"
        onClick={refreshVisualisationData}
      >
        <button
          className="w-full h-full bg-nodeRock"
          onClick={() => addColEnd(visualisationData)}
        />
        <button
          className="w-full h-full bg-red-500"
          onClick={() => removeColEnd(visualisationData)}
        />
      </div>
    </div>
  );
}
