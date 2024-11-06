import { ObjectId } from "mongodb";
import { HTTPException } from "hono/http-exception";

import type { Report, ReportInsert } from "../schemas/feedback-schemas";
import type { ListOptions } from "../schemas/general-schemas";
import { reportsCollection } from "../db";

export async function list(opts?: ListOptions): Promise<Report[]> {
  console.log({ opts });
  try {
    const reports = await reportsCollection
      .find({})
      .skip(opts?.skip || 0)
      .limit(opts?.limit || 0)
      .toArray();
    return reports;
  } catch (error) {
    console.error(error);
    throw new HTTPException(500, { message: "Error retrieving reports" });
  }
}

export async function create(payload: ReportInsert): Promise<Report> {
  let id: ObjectId;
  try {
    const result = await reportsCollection.insertOne(payload);
    id = result.insertedId;
  } catch (error) {
    console.error(error);
    throw new HTTPException(500, { message: "Error creating report" });
  }

  const report = await reportsCollection.findOne({
    _id: id,
  });
  return report!;
}
