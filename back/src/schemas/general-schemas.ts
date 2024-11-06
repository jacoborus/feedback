import { z } from "@hono/zod-openapi";

const feedbackType = z.enum(["bug", "suggestion", "all"]);
export type FeedbackType = z.infer<typeof feedbackType>;

const sortBy = z.enum(["date", "name"]);
export type SortBy = z.infer<typeof sortBy>;

export const listOptions = z.object({
  page: z.coerce
    .number()
    .positive()
    .default(1)
    .openapi({
      param: {
        name: "page",
        in: "query",
        description: "page of items to get",
      },
      example: 2,
    })
    .optional(),

  feedbacktype: z
    .enum(["bug", "suggestion", "all"])
    .default("all")
    .openapi({
      param: {
        name: "feedbacktype",
        in: "query",
        description: "Filter by feedback type",
      },
      example: "bug",
    })
    .optional(),

  sortby: z
    .enum(["date", "name"])
    .default("date")
    .openapi({
      param: {
        name: "sortby",
        in: "query",
        description: "Sort by date or name",
      },
      example: "name",
    })
    .optional(),
});

export type ListOptions = z.infer<typeof listOptions>;

export const IdParamSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "id",
        in: "path",
        description: "the id of the task",
      },
      example: "1212121",
    }),
});
