import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {resolve} from "path";

const __dirname = import.meta.dirname;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
