import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: "/space-tourism-multi-page-website/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "src/assets"),
      "@styles": resolve(__dirname, "src/styles"),
      "@js": resolve(__dirname, "src/js"),
      "@data": resolve(__dirname, "src/data"),
    },
  },
});