import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import feedbackRoutes from "./feedback-routes";

const api = new OpenAPIHono();

api.route("/feedback", feedbackRoutes);

// OpenAPI spec at /docs
api.doc31("/_docs", (c) => ({
  openapi: "3.1.0",
  info: { title: "Feedback Docs", version: "1" },
  servers: [
    {
      url: new URL(c.req.url).origin + "/api",
      description: "Current environment",
    },
  ],
}));

// Swagger UI at /ui
api.get("/_ui", swaggerUI({ url: "./_docs" }));

export default api;
