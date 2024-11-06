import { z } from "@hono/zod-openapi";

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
});

export type ListOptions = z.infer<typeof listOptions>;
