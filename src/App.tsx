import GraphSettings from "./components/GraphSettings";
import GraphContainer from "./components/GraphContainer";
import GraphTools from "./components/GraphTools";
import { SettingsProvider } from "./SettingsContext";

export default function App() {
  return (
    <SettingsProvider>
      <main className="grid grid-rows-[30vh_70dvh_30dvh] grid-cols-1 md:grid-rows-1 md:grid-cols-[2fr_6fr_2fr] bg-bgW md:min-h-[100vh]">
        <GraphSettings />
        <GraphContainer />
        <GraphTools />
      </main>
    </SettingsProvider>
  );
}