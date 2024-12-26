import { Elysia } from "elysia";

export const loggingPlugin = (app: Elysia) =>
  app.onRequest(({ request }) => {
    const url = new URL(request.url);
    console.log(
      `[${new Date().toISOString()}] ${request.method} ${url.pathname}`
    );
  });
