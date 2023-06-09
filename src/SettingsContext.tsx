import React, { useContext, useState } from "react";
import { UserGraphTypes } from "./graphDataSets/allGraphData";
import { SearchAlgorithmsTypes } from "./searchAlgorithms/allAlgorithmData";

interface GraphTypeContextProps {
  type: UserGraphTypes,
  updateType: (type: UserGraphTypes) => void,
}

interface SearchAlgorithmTypeContextProps {
  type: SearchAlgorithmsTypes,
  updateType: (type: SearchAlgorithmsTypes) => void,
}

const GraphTypeContext = React.createContext<GraphTypeContextProps|null>(null);
const SearchAlgorithmTypeContext = React.createContext<SearchAlgorithmTypeContextProps|null>(null);

export function useGraphType() {
  return useContext(GraphTypeContext);
}

export function useSearchAlgorithmType() {
  return useContext(SearchAlgorithmTypeContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [ graphType, setGraphType ] = useState<UserGraphTypes>(UserGraphTypes.matrix);
  const [ searchAlgorithmType, setSearchAlgorighmType ] = useState<SearchAlgorithmsTypes>(SearchAlgorithmsTypes.dfs);

  function updateGraphType(type: number) {
    setGraphType(type);
  }

  return (
    <GraphTypeContext.Provider value={{type: graphType, updateType: updateGraphType}}>
      <SearchAlgorithmTypeContext.Provider value={{type: searchAlgorithmType, updateType: setSearchAlgorighmType}}>
        { children }
      </SearchAlgorithmTypeContext.Provider>
    </GraphTypeContext.Provider>
    
  );
}