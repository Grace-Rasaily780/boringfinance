import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { auth } from "./user/auth";
import { user } from "./user/user";
import { balance } from "./balance/index";
import { method503020 } from "./method503020/index";
import { transaction } from "./transaction/index";
import mongoose from "mongoose";
import "dotenv/config";

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = new Elysia()
  .use(cors())
  .group("/auth", (app) => app.use(auth))
  .group("/user", (app) => app.use(user))
  .group("/balance", (app) => app.use(balance))
  .group("/method503020", (app) => app.use(method503020))
  .group("/transaction", (app) => app.use(transaction))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
