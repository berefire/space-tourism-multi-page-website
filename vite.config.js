import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";

function htmlPartials() {
  return {
    name: "html-partials",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html.replace(/<!--\s*@include\s+([\w./-]+)\s*-->/g, (_, file) => {
          const partialPath = resolve(import.meta.dirname, "src/partials", file);
          return readFileSync(partialPath, "utf-8");
        });
      },
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), htmlPartials()],
  base: "/space-tourism-multi-page-website/",
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "src"),
      "@assets": resolve(import.meta.dirname, "src/assets"),
      "@styles": resolve(import.meta.dirname, "src/styles"),
      "@js": resolve(import.meta.dirname, "src/js"),
      "@data": resolve(import.meta.dirname, "src/data"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        destination: resolve(import.meta.dirname, "destination.html"),
        crew: resolve(import.meta.dirname, "crew.html"),
        technology: resolve(import.meta.dirname, "technology.html"),
      },
    },
  },
});