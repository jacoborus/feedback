import { ObjectId } from "mongodb";
import { HTTPException } from "hono/http-exception";

import type { Report, ReportInsert } from "../schemas/feedback-schemas";
import type { ListOptions } from "../schemas/general-schemas";
import { reportsCollection } from "../db";

export async function list(opts?: ListOptions): Promise<Report[]> {
  let findQuery: ListOptions = {};
  if (opts?.feedbacktype && opts.feedbacktype !== "all") {
    findQuery.feedbacktype = opts.feedbacktype;
  }

  try {
    const reports = await reportsCollection
      .find(findQuery)
      .collation({ locale: "en", strength: 1 })
      .sort(opts?.sortby || "date", 1)
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
    const result = await reportsCollection.insertOne({
      ...payload,
      date: new Date(),
    });
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

export async function remove(id: string) {
  try {
    await reportsCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (e) {
    console.error(e);
    throw new HTTPException(500, { message: "Error removing report" });
  }
}
