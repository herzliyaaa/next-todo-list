import type { NextApiRequest, NextApiResponse } from "next";
import { lists } from "./data";
import { List } from "@/interfaces";
import ResponseError from "@/interfaces/error";
export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<List | ResponseError>
) {
  const { query, method } = req;
  const { id } = query;
  const list = lists.find((list) => list.id === parseInt(id as string));

  switch (method) {
    case "GET":
      // Get data from your database
      list
        ? res.status(200).json(list)
        : res.status(404).json({ message: `User with id: ${id} not found.` });
      break;
    case "PUT":
      // Update or create data in your database
      list
        ? res.status(200).json(list)
        : res.status(404).json({ message: `User with id: ${id} not found.` });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
