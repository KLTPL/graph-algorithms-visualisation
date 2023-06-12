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

interface ListOfStepsIdxContextProps {
  idx: number,
  updateIdx: (idx: number) => void,
}

const GraphTypeContext = React.createContext<GraphTypeContextProps|null>(null);
const SearchAlgorithmTypeContext = React.createContext<SearchAlgorithmTypeContextProps|null>(null);
const ListOfStepsIdxContext = React.createContext<ListOfStepsIdxContextProps|null>(null);

export function useGraphType() {
  return useContext(GraphTypeContext);
}

export function useSearchAlgorithmType() {
  return useContext(SearchAlgorithmTypeContext);
}

export function useListOfStepsIdx() {
  return useContext(ListOfStepsIdxContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [ graphType, setGraphType ] = useState<UserGraphTypes>(UserGraphTypes.matrix);
  const [ searchAlgorithmType, setSearchAlgorighmType ] = useState<SearchAlgorithmsTypes>(SearchAlgorithmsTypes.dfs);
  const [ listOfStepsIdx, setListOfStepsIdx ] = useState<number>(0);

  return (
    <GraphTypeContext.Provider value={{type: graphType, updateType: setGraphType}}>
      <SearchAlgorithmTypeContext.Provider value={{type: searchAlgorithmType, updateType: setSearchAlgorighmType}}>
        <ListOfStepsIdxContext.Provider value={{idx: listOfStepsIdx, updateIdx: setListOfStepsIdx}}>
          { children }
        </ListOfStepsIdxContext.Provider>
      </SearchAlgorithmTypeContext.Provider>
    </GraphTypeContext.Provider>
  );
}