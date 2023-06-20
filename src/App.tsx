import GraphSettings from "./components/VisualisationSettings";
import GraphContainer from "./components/VisualisationContainer";
import GraphTools from "./components/VisualisationTools";
import { SettingsProvider } from "./SettingsContext";

export default function App() {
  return (
    <SettingsProvider>
      <main className="flex flex-col md:grid grid-rows-[30vh_70dvh_30dvh] md:grid-rows-1 md:grid-cols-[2fr_6fr_2fr] bg-bgW min-h-[100dvh]">
        <GraphSettings />
        <GraphContainer />
        <GraphTools />
      </main>
    </SettingsProvider>
  );
}