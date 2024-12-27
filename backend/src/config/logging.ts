import { Elysia } from "elysia";

export const loggingPlugin = (app: Elysia) => {
  return app.onRequest((context) => {
    try {
      const { request } = context;
      const url: string | URL = new URL(request.url);
      console.log(
        `[${new Date().toISOString()}] ${request.method} ${url.pathname}`
      );
    } catch (error) {
      console.error("Logging error:", error);
    }
  });
};
