import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "./data";
import { User, ResponseError } from "../../interfaces";
export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError>
) {
  const { query, method } = req;
  const { id } = query;
  let person: User = users.find((p) => p.id === id);
  console.log("🚀 ~ file: [id].ts:11 ~ person:", person);

  switch (method) {
    case "GET":
      // Get data from your database
      person
        ? res.status(200).json(person)
        : res.status(404).json({ message: `User with id: ${id} not found.` });
      break;
    case "PUT":
      // Update or create data in your database
      res.status(200).json(person);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
