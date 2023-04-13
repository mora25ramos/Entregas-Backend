import { MongoClient } from "mongodb";

let db = null;

export async function connectDB() {
  const client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  await client.connect();
  console.log("Connected to MongoDB!");

  db = client.db(process.env.DB_NAME);
}

export function getDB() {
  return db;
};