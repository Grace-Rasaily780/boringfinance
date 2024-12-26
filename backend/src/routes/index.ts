import { Elysia } from "elysia";
import { auth } from "../user/auth";
import { user } from "../user/user";
import { balance } from "../balance/index";
import { method503020 } from "../method503020/index";
import { transaction } from "../transaction/index";
import { applyCoreMiddleware } from "../config/middleware";

export function setupRoutes(): Elysia {
  return applyCoreMiddleware(new Elysia())
    .get("/", () => "Boring Finance")
    .group("/auth", (app) => app.use(auth))
    .group("/user", (app) => app.use(user))
    .group("/balance", (app) => app.use(balance))
    .group("/method503020", (app) => app.use(method503020))
    .group("/transaction", (app) => app.use(transaction));
}
