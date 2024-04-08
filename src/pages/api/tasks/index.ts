import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (req.method === "GET") {
    const client = new MongoClient(MONGODB_URI || "", {});

    try {
      await client.connect();
      const db = client.db();
      const posts = await db.collection("comments").find({}).toArray();

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Unable to connect to database", msg: error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: "Unsupported HTTP method" });
  }
}
