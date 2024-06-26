// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "./data";
import { User } from "@/interfaces";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  res.status(200).json(users);
}
