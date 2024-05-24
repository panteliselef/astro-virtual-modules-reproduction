import { defineMiddleware } from "astro/middleware";
import { als } from "virtual:astro-als/internal/als";

export const integrationMiddleware = defineMiddleware((_, next)=>{
    return als.run({ auth: "hehe" }, next);
})