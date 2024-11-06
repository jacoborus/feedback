import { ObjectId } from "mongodb";
import { HTTPException } from "hono/http-exception";

import type { Report, ReportInsert } from "../schemas/feedback-schemas";
import type { ListOptions } from "../schemas/general-schemas";
import { reportsCollection } from "../db";

export interface ItemList {
  items: Report[];
  total: number;
  page: number;
}

export async function list(opts?: ListOptions): Promise<ItemList> {
  let findQuery: ListOptions = {};
  if (opts?.feedbacktype && opts.feedbacktype !== "all") {
    findQuery.feedbacktype = opts.feedbacktype;
  }
  const page = opts?.page || 1;
  if (page < 1) {
    throw new HTTPException(401, { message: "Invalid page" });
  }

  const skip = (page - 1) * 5;

  try {
    const items = await reportsCollection
      .find(findQuery)
      .collation({ locale: "en", strength: 1 })
      .sort(opts?.sortby || "date", 1)
      .skip(skip)
      .limit(5)
      .toArray();
    const total = await reportsCollection.countDocuments();
    return { total, items, page };
  } catch (error) {
    console.error(error);
    throw new HTTPException(500, { message: "Error retrieving reports" });
  }
}

export async function getById(id: string): Promise<Report> {
  try {
    return await reportsCollection.findOne({ _id: new ObjectId(id) });
  } catch (e) {
    console.error(e);
    throw new HTTPException(500, { message: "Error getting report" });
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
