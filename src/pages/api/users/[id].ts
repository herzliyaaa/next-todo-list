import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "./data";
import  User from "../../interfaces";
import ResponseError from "../../interfaces/error"
export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError>
) {
  const { query, method } = req;
  const { id } = query;
  const person = users.find((p) => p.id === parseInt(id as string));

  switch (method) {
    case "GET":
      // Get data from your database
      person
        ? res.status(200).json(person)
        : res.status(404).json({ message: `User with id: ${id} not found.` });
      break;
    case "PUT":
      // Update or create data in your database
      person
        ? res.status(200).json(person)
        : res.status(404).json({ message: `User with id: ${id} not found.` });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
