import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensure Vite is running on port 5173
  },
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: "/index.html",
        background: "src/background/background.js",
        content: "src/content-scripts/content.js",
      },
    },
  },
});
