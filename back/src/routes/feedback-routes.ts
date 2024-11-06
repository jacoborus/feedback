import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";

import * as feedbackService from "../services/feedback-service";
import { reportSchema, reportSchemaInsert } from "../schemas/feedback-schemas";
import { IdParamSchema } from "../schemas/general-schemas";
import type { FeedbackType, SortBy } from "../schemas/general-schemas";
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
      200: jsonSchema(
        z.object({
          items: z.array(reportSchema),
          total: z.number(),
          page: z.number(),
        }),
        "The reports",
      ),
      ...genericResponses,
    },
    tags: ["Feedback"],
  }),
  async (c) => {
    let page = 1;
    let feedbacktype: FeedbackType | undefined;
    let sortby: SortBy | undefined;
    const query = c.req.query();

    try {
      const parsedQuery = listOptions.parse(query);
      page = parsedQuery.page || 1;
      feedbacktype = parsedQuery.feedbacktype;
      sortby = parsedQuery.sortby;
    } catch (e) {
      console.error(e);
      throw new HTTPException(401, {
        message: "Wrong query retrieving feedback",
      });
    }

    const result = await feedbackService.list({
      page,
      feedbacktype,
      sortby,
    });

    return c.json(result, 200);
  },
);

// GET /{id}
router.openapi(
  createRoute({
    operationId: "getReport",
    summary: "Get a report",
    method: "get",
    path: "/{id}",
    tags: ["Feedback"],
    request: { params: IdParamSchema },
    responses: {
      200: jsonSchema(reportSchema, "A report"),
      ...genericResponses,
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");
    const report = await feedbackService.getById(id);
    return c.json(report, 200);
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
    await feedbackService.remove(id);
    return c.json({ id }, 200);
  },
);

export default router;
