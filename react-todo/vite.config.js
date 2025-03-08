import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteJest from "vite-jest";
import viteTsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [viteTsConfigPaths(), viteJest(), react()],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
});
