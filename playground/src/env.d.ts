/// <reference types="astro/client" />

declare module "virtual:astro-als/internal/user-config" {
	export const userConfig: import("./src/types.js").Options;
}

declare module "als:astro" {
	export const getAlsData: () => Awaited<
		ReturnType<import("./src/types.js").AlsConfig["seedData"]>
	>;
}