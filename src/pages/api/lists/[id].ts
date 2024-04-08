import type { NextApiRequest, NextApiResponse } from "next";
import { lists } from "./data";
import { List } from "@/interfaces";
import { ResponseError } from "@/interfaces/error";
export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<List | ResponseError>
) {
  const { query, method } = req;
  const { id } = query;
  const list = lists.find((list) => list.id === parseInt(id as string));
  const listIndex = lists.findIndex(
    (list) => list.id === parseInt(id as string)
  );

  switch (method) {
    case "GET":
      // Get data from your database
      list
        ? res.status(200).json(list)
        : res.status(404).json({ message: `User with id: ${id} not found.` });
      break;
    case "PUT":
      const updatedList = lists[listIndex];
      if (updatedList) {
        const { taskIndex } = req.body;
        if (
          typeof taskIndex !== "undefined" &&
          taskIndex >= 0 &&
          taskIndex < updatedList.task.length
        ) {
          updatedList.task[taskIndex].completed = true;
          res.status(200).json(updatedList);
        } else {
          res.status(400).json({ message: "Invalid taskIndex provided." });
        }
      } else {
        res.status(404).json({ message: `List with id: ${id} not found.` });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
