import GraphSettings from "./components/visualisation-settings/VisualisationSettings";
import GraphContainer from "./components/visualisation-container/VisualisationContainer";
import GraphTools from "./components/visualisation-tools/VisualisationTools";
import { ContextProvider } from "./context/Context";

export default function App() {
  return (
    <ContextProvider>
      <main className="flex flex-col md:grid grid-rows-[30vh_70dvh_30dvh] md:grid-rows-1 md:grid-cols-[2fr_6fr_2fr] bg-bg1 min-h-[100dvh]">
        <GraphSettings />
        <GraphContainer />
        <GraphTools />
      </main>
    </ContextProvider>
  );
}
