# my-integration

## Instruction for reproduction
Issue `Could not resolve "als:astro"`

- `pnpm i`
- `cd package && pnpm build && yalc push --replace --sig`
- `cd ../playground`
- `yalc add -- my-integration`
- `pnpm i && rm -rf dist/ && pnpm dev`
