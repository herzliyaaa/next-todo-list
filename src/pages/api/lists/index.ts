// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { lists } from "./data";
import { List } from "@/interfaces/";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<List[]>
) {
  res.status(200).json(lists);
}
