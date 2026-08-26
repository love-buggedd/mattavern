import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "path";

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    target: "esnext",
    outDir: path.resolve(__dirname, "../../web/public/pico8"),
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, "player.html"),
    },
  },
});
