import { MongoClient, Db, Collection } from "mongodb";

import type { ReportInsert } from "./schemas/report-schemas";

const url = "mongodb://root:password@localhost:27017";
const client = new MongoClient(url);

const dbName = "markertestdb";

let db: Db;
export let reportsCollection: Collection<ReportInsert>;

export async function connectDb() {
  await client.connect();
  console.log("Connected successfully to db");
  db = client.db(dbName);
  reportsCollection = db.collection<ReportInsert>("reports");
}
