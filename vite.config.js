import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the build works on GitHub Pages project sites,
  // Netlify, and a plain upload of the dist folder.
  base: "./",
});
