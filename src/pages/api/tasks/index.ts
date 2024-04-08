import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let MONGODB_URI = process.env.MONGODB_URI;
  let client: MongoClient | null = null;

  if (req.method === "GET") {
    try {
      const listName = req.query.listName as string;

      if (!listName) {
        throw new Error("List name is required");
      }

      client = new MongoClient(MONGODB_URI || "", {});

      await client.connect();

      const db = client.db();

      // Find the list document by its name
      const list = await db.collection("lists").findOne({ name: listName });

      if (!list) {
        throw new Error("List not found");
      }

      // Query tasks associated with the list by list ID
      const tasks = await db.collection("tasks").find({ listId: list._id }).toArray();
     
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Unable to fetch tasks", msg: error });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else if (req.method === "POST") {
    try {
      // Parse incoming JSON data from the request body
      const data = req.body;
      data.listId = new ObjectId(data.listId);
      // Connect to MongoDB
      client = new MongoClient(MONGODB_URI || "", {});
      await client.connect();

      // Access the database and collection
      const db = client.db();
      const collection = db.collection("tasks");

      // Insert data into the collection
      const result = await collection.insertOne(data);

      // Close the MongoDB connection
      await client.close();

      res.status(201).json({ message: "Data added successfully", data: result });
    } catch (error) {
      console.error("Error adding data:", error);
      res.status(500).json({ error: "Unable to add data" });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    res.status(405).json({ error: "Unsupported HTTP method" });
  }
}
