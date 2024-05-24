import { defineConfig } from "tsup";
import { name, version } from "./package.json";

export default defineConfig(() => {
  return {
    clean: true,
    entry: ["./src/index.ts", "./src/middleware.ts", "./src/data.ts"],
    dts: true,
    minify: false,
    define: {
      PACKAGE_NAME: `"${name}"`,
      PACKAGE_VERSION: `"${version}"`,
    },
    bundle: true,
    sourcemap: true,
    splitting: false,
    format: ["esm"],
    target: "node18",
    external: [
      "astro",
      "react",
      "react-dom",
      "virtual:astro-als/internal/als",
      "als:astro",
    ],
  };
});
