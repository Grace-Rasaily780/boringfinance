import "dotenv/config";
import { connectDatabase } from "./config/database";
import { setupRoutes } from "./routes";

connectDatabase();
const app = setupRoutes().listen(process.env.PORT!);

// Safely log server information
if (app && app.server) {
  console.log(
    `🦊 Elysia is running at ${app.server.hostname}:${app.server.port}`
  );
} else {
  console.error("Failed to start Elysia server");
}
