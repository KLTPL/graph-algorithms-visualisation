import { useEffect, useState } from "react";
import { useGraphType } from "../SettingsContext";
import { UserGraphTypes } from "../graphDataSets/allGraphData";

export default function GraphSettingsSelectType() {
  const graphTypeContext = useGraphType();

  return (
    <div className="flex flex-col">
      <h3>Graph type:</h3>
      <button onClick={() => graphTypeContext?.updateType(UserGraphTypes.matrix)}>
        matrix graph
      </button>
      <button onClick={() => graphTypeContext?.updateType(UserGraphTypes.directed)}>
        directed graph
      </button>
      <button onClick={() => graphTypeContext?.updateType(UserGraphTypes.directedWeighted)}>
        directed weighted graph
      </button>
      <button onClick={() => graphTypeContext?.updateType(UserGraphTypes.undirected)}>
        undirected graph
      </button>
      <button onClick={() => graphTypeContext?.updateType(UserGraphTypes.undirectedWeighted)}>
        undirected weighted graph
      </button>
      { graphTypeContext?.type }
    </div>
  );
}