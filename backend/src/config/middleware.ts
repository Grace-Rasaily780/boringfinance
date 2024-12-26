import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { loggingPlugin } from "./logging";

export function applyCoreMiddleware(app: Elysia): Elysia {
  const configuredApp = app.use(cors()).use(loggingPlugin);

  if (
    configuredApp &&
    typeof configuredApp.get === "function" &&
    typeof configuredApp.use === "function"
  ) {
    return configuredApp;
  }

  throw new Error("Failed to configure middleware");
}
