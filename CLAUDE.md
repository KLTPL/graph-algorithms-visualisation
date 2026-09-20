# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server.
- `npm run build` — type-check (`tsc`) then build with Vite.
- `npm run preview` — preview the production build locally.
- `firebase deploy` — deploy `public/` to Firebase Hosting (project id `graph-algorithms-visualisation` in `.firebaserc`).

There is no test suite and no lint config in this repo. Use `npm run build` (which runs `tsc`) as the correctness check after changes.

## Architecture

React + TypeScript + Vite app that visualises graph search algorithms (DFS, BFS, Dijkstra's) step by step. Three-column layout in `src/App.tsx`: `VisualisationSettings` (pick graph/algorithm type) | `VisualisationContainer` (render graph + playback controls) | `VisualisationTools` (pointer-based graph editing tools), all wrapped in `ContextProvider`.

### Graph type split: M vs E

Every graph-related module branches on two fundamentally different graph representations, and most files come in matching pairs for each:

- **M (matrix graph)**: a grid of cells (`GraphM = NodeTypesM[][]`), each empty or a "rock" (wall). Nodes are `FieldM = {x, y}`. Search moves between adjacent grid cells.
- **DW (directed weighted graph)**: an adjacency list (`GraphDW = ToNodeDW[][]`), used as the single internal representation for *all* edge-based graphs. Nodes are plain numbers (`NodeE`).

User-facing graph types (`UserGraphTypes`: `M`, `D`, `U`, `DW`, `UW`) are converted down to just two internal shapes before any algorithm runs — see the comment at the top of `src/visualisationData/typesGraphData.ts`:
- `M` stays `M`.
- `D`, `U`, `DW`, `UW` (collectively "E" = edge graphs) are all normalized into `DW` — unweighted edges get `cost: 1` (via `getConverted` in `getProperDataFunctions.ts`), and undirected edges are stored as two directed edges.

This M/DW split propagates through the codebase as parallel implementations:
- `src/visualisationData/searchAlgorithms/M/*` vs `src/visualisationData/searchAlgorithms/DW/*` — same algorithms (`dfsAndBfs.ts`, `dijkstras.ts`), one per representation.
- `src/components/visualisation-container/graph-components/M/` (`M.tsx`) vs `.../E/` (`E.tsx`) — rendering.
- `src/components/visualisation-container/element-components/nodeM/` vs `nodeE/`, and `edgeE/` (M has no separate edge component — adjacency is implicit in the grid).
- `src/components/visualisation-tools/SelectToolsM.tsx` vs `SelectToolsE.tsx` — the editing tools differ (M: paint empty/rock/start/end fields; E: add/remove nodes and edges).

When adding a feature that touches graph data or algorithms, check whether it needs to be implemented once per representation (M and DW) rather than once. `typesGraphData.ts`, `typesAlgorithmData.ts`, and `typesVisualisationData.ts` define the shared type contracts (`AnyGraph`, `AnyGraphData`, `AnySearchExecutionData`, `AnyVisualisationData`, etc.) that both branches must satisfy.

### Data flow

1. Static seed data per user graph type lives in `src/visualisationData/graphDataSets/{M,D,DW,U,UW}.ts`.
2. `getProperDataFunctions.ts` is the central dispatcher: `getProperGraphData` picks the seed set, `getProperAlgorithmData` picks and runs the matching M/DW algorithm function, and `getProperVisualisationData` merges graph data + algorithm output into one `AnyVisualisationData` object (a search algorithm here doesn't mutate state — it eagerly computes the *entire* step list and final path up front).
3. `Context.tsx` holds this merged `visualisationData` in React state, plus playback state (`currStepIdx`) and the active editing tool (`pointerTool`, from `VisualisationPointerTools` in `VisualisationTools.tsx`). `switchVisualisationData` recomputes everything when the user changes graph/algorithm type; `refreshVisualisationData` recomputes after the user edits the graph itself (e.g. adding a node) using the graph's current shape.
4. `VisualisationContainer.tsx` drives playback (`currStepIdx` stepping/animation via `playVisualisation`) and, once the end node is reached, triggers a backtrack animation (`backtrackMechanic.ts`) that walks `pathToEndNode` before showing the `Summary`.

### Algorithm functions

Each algorithm function (`dfs`, `bfs`, `dijkstras`) takes `GraphDataM`/`GraphDataDW` and returns a `SearchExecutionDataM`/`SearchExecutionDataDW`: the full `listOfSteps` (every node visited, in order — this is what drives the step-by-step visualisation), whether the end node was reached, and if so the backtracked `pathToEndNode` and `pathCost`. `dijkstras.ts` under `M/` and `DW/` also reuses `src/utils/PriorityQueue.ts`.

### Naming shortcuts

From `README.md` — used throughout file/type/variable names:
- `M` — matrix graph
- `D` — directed graph
- `DW` — directed weighted graph
- `U` — undirected graph
- `UW` — undirected weighted graph
- `E` — edge graph (any of D/DW/U/UW, as opposed to M)
