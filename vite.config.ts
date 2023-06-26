import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // All of this to import tailwind config file
  build: {
    commonjsOptions: {
      include: ["tailwind-config.js", "node_modules/**"],
    },
  },
  optimizeDeps: {
    include: ["tailwind-config"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "tailwind-config": resolve(__dirname, "./tailwind.config.js"),
    },
  },
});
