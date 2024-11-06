import { z } from "zod";
import { ObjectId } from "mongodb";

export const reportSchema = z
  .object({
    _id: z.instanceof(ObjectId),
    name: z.string().openapi({
      example: "John Doe",
    }),
    email: z.string().email({ message: "Invalid email address" }).openapi({
      example: "johndoe@example.com",
    }),
    feedbacktype: z.enum(["bug", "suggestion"]),
    title: z.string().openapi({
      example: "Bug in the page",
    }),
    message: z.string().openapi({
      example: "Found a bug in this page",
    }),
    date: z.date().openapi({
      example: "2021-09-01T00:00:00.000Z",
    }),
  })
  .openapi("Report");

export const reportSchemaInsert = reportSchema
  .omit({ _id: true, date: true })
  .openapi("ReportInsert");

export type Report = z.infer<typeof reportSchema>;
export type ReportInsert = z.infer<typeof reportSchemaInsert>;
