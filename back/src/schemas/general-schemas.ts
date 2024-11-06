import { z } from "@hono/zod-openapi";

const feedbackType = z.enum(["bug", "suggestion", "all"]);
export type FeedbackType = z.infer<typeof feedbackType>;

const sortBy = z.enum(["date", "name"]);
export type SortBy = z.infer<typeof sortBy>;

export const listOptions = z.object({
  limit: z.coerce
    .number()
    .openapi({
      param: {
        name: "limit",
        in: "query",
        description: "amount of items to get",
      },
      example: 10,
    })
    .optional(),

  skip: z.coerce
    .number()
    .openapi({
      param: {
        name: "skip",
        in: "query",
        description: "skip amount of items to get",
      },
      example: 20,
    })
    .optional(),

  feedbacktype: z
    .enum(["bug", "suggestion", "all"])
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
