import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";

import * as feedbackService from "../services/feedback-service";
import { reportSchema, reportSchemaInsert } from "../schemas/feedback-schemas";
import { IdParamSchema } from "../schemas/general-schemas";
import { jsonBody, jsonSchema } from "../utils/converters.util";
import { genericResponses } from "../utils/generic-responses";
import { listOptions } from "../schemas/general-schemas";

const router = new OpenAPIHono<{}>();

// GET /
router.openapi(
  createRoute({
    operationId: "listReports",
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
    operationId: "createReport",
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

// DELETE /{id}
router.openapi(
  createRoute({
    operationId: "removeReport",
    summary: "Delete a report",
    method: "delete",
    path: "/{id}",
    tags: ["Feedback"],
    request: { params: IdParamSchema },
    responses: {
      200: jsonSchema(IdParamSchema, "Deleted report successfully"),
      ...genericResponses,
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");
    console.log({ id });
    await feedbackService.remove(id);
    console.log({ id });
    return c.json({ id }, 200);
  },
);

export default router;
