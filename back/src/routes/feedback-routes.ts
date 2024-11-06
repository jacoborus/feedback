import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";

import * as feedbackService from "../services/feedback-service";
import { reportSchema, reportSchemaInsert } from "../schemas/feedback-schemas";
import { jsonBody, jsonSchema } from "../utils/converters.util";
import { genericResponses } from "../utils/generic-responses";
import { listOptions } from "../schemas/general-schemas";

const router = new OpenAPIHono<{}>();

// GET /
router.openapi(
  createRoute({
    operationId: "list",
    summary: "List all the reports",
    method: "get",
    path: "/",
    request: {
      query: listOptions,
    },
    responses: {
      200: jsonSchema(z.array(reportSchema), "The reports"),
      ...genericResponses,
    },
    tags: ["Feedback"],
  }),
  async (c) => {
    let limit: number | undefined;
    let skip: number | undefined;
    const query = c.req.query();
    try {
      const parsedQuery = listOptions.parse(query);
      limit = parsedQuery.limit;
      skip = parsedQuery.skip;
    } catch (e) {
      console.error(e);
      throw new HTTPException(401, {
        message: "Wrong query retrieving feedback",
      });
    }
    const reports = await feedbackService.list({ limit, skip });
    return c.json(reports, 200);
  },
);

// POST /
router.openapi(
  createRoute({
    operationId: "create",
    summary: "Create one report",
    method: "post",
    path: "/",
    tags: ["Feedback"],
    request: jsonBody(reportSchemaInsert, "a report object"),
    responses: {
      201: jsonSchema(reportSchema.nullable(), "New report"),
      ...genericResponses,
    },
  }),
  async (c) => {
    const body = c.req.valid("json");
    const report = await feedbackService.create(body);
    return c.json(report, 201);
  },
);

export default router;
