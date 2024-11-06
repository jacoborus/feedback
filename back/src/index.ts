import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { compress } from "hono/compress";
import { prettyJSON } from "hono/pretty-json";
import api from "./routes/api";
import { connectDb } from "./db";

const app = new OpenAPIHono();

app.use("/*", cors());
app.use("*", compress());
app.use("*", prettyJSON());
app.use("*", logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.route("/api", api);

const port = 3000;

await connectDb();

serve({
  fetch: app.fetch,
  port,
});
console.log(`Server is running on http://localhost:${port}`);
