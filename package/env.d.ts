/// <reference types="astro/client" />

declare module "virtual:astro-als/internal/als" {
  export const als: import("node:async_hooks").AsyncLocalStorage<Data>;
}

declare module "als:astro" {
  export const getAlsData: () => Awaited<{}>;
}
