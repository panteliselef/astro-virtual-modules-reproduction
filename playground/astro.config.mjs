import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import react from "@astrojs/react";

import myIntegration from "my-integration";

import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";
import { defineConfig } from "astro/config";


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    tailwind(),
	react(),
    myIntegration(),
    hmrIntegration({
      directory: createResolver(import.meta.url).resolve("../package/dist"),
    }),
  ],
});
