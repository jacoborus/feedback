import { ZodSchema } from "zod";

export function jsonSchema<T extends ZodSchema>(
  schema: T,
  description: string,
) {
  return {
    description,
    content: { "application/json": { schema } },
  };
}

export function jsonBody<T extends ZodSchema>(schema: T, description: string) {
  return {
    body: jsonSchema(schema, description),
  };
}
