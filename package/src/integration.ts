const VIRTUAL_IMPORT_INTERNAL_ALS_ID = "virtual:astro-als/internal/als";
const VIRTUAL_IMPORT_ID = "als:astro";

// import type { AstroIntegration } from "astro";
// import type { Plugin } from "vite";
// function virtualImport({
//   nameCount,
//   id: virtualModuleId,
//   content,
//   context,
// }: {
//   nameCount: number;
//   id: string;
//   content: string;
//   context: "server" | "client";
// }): Plugin {
//   const resolvedVirtualModuleId = "\0" + virtualModuleId;
//   const name = `astro-clerk-${nameCount}`;
//   console.log("NICe");

//   return {
//     name, // required, will show up in warnings and errors
//     resolveId(id) {
//       if (id === virtualModuleId) {
//         return resolvedVirtualModuleId;
//       }
//       return;
//     },
//     load(id, options) {
//       if (id === resolvedVirtualModuleId) {
//         const _context = options?.ssr ? "server" : "client";
//         if (context === _context) {
//           return content;
//         }
//       }
//       return;
//     },
//   };
// }

// export const integration = (): AstroIntegration => {
//   return {
//     name: "lol",
//     hooks: {
//       "astro:config:setup": (params) => {
//         //   params.injectScript(
//         //     "page",
//         //     `
//         // import { getAlsData } from "als:astro";
//         // console.log('from page',getAlsData() )
//         // `
//         //   );

//         // params.injectScript(
//         //   "page",
//         //   `
//         // import { getAlsData } from "my-integration/data";
//         // console.log('from page 2',getAlsData())
//         // `
//         // );

//         params.updateConfig({
//           vite: {
//             plugins: [
//               virtualImport({
//                 nameCount: 1,
//                 id: VIRTUAL_IMPORT_INTERNAL_ALS_ID,
//                 content: `import { AsyncLocalStorage } from "node:async_hooks";
// export const als = new AsyncLocalStorage();`,
//                 context: "server",
//               }),
//               virtualImport({
//                 nameCount: 2,
//                 id: VIRTUAL_IMPORT_ID,
//                 content: `import { als } from ${JSON.stringify(
//                   VIRTUAL_IMPORT_INTERNAL_ALS_ID
//                 )};
// export const getAlsData = () => als.getStore();`,
//                 context: "server",
//               }),
//               virtualImport({
//                 nameCount: 3,
//                 id: VIRTUAL_IMPORT_ID,
//                 content: `
// export const getAlsData = () => JSON.parse(document.getElementById('clerk-data').textContent);`,
//                 context: "client",
//               }),
//             ],
//           },
//         });
//       },
//     },
//   };
// };

import { addVirtualImports, defineIntegration } from "astro-integration-kit";

export const integration = defineIntegration({
  name: "my-integration",
  setup({ name }) {
    return {
      hooks: {
        "astro:config:setup": (params) => {
          addVirtualImports(params, {
            name,
            imports: [
              {
                id: VIRTUAL_IMPORT_INTERNAL_ALS_ID,
                content: `import { AsyncLocalStorage } from "node:async_hooks";
                  export const als = new AsyncLocalStorage();
                `,
                context: "server",
              },
              {
                id: VIRTUAL_IMPORT_ID,
                content: `import { als } from ${JSON.stringify(
                  VIRTUAL_IMPORT_INTERNAL_ALS_ID
                )};
                export const getAlsData = () => als.getStore();
                `,
                context: "server",
              },
              {
                id: VIRTUAL_IMPORT_ID,
                content: `
                  export const getAlsData = () => JSON.parse(document.getElementById('clerk-data').textContent);
                `,
                context: "client",
              },
            ],
          });
        },
      },
    };
  },
});
