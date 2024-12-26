import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { loggingPlugin } from "./logging";

export function applyCoreMiddleware(app: Elysia): Elysia {
  return app.use(cors()).use(loggingPlugin);
}
