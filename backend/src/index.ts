import "dotenv/config";
import { connectDatabase } from "./config/database";
import { setupRoutes } from "./routes";

connectDatabase();
const app = setupRoutes().listen(process.env.PORT!);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
