// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  id: number;
  name?: string;
};

const user: User[] = [
  { id: 1, name: "Minnie" },
  { id: 2, name: "Sky" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  res.status(200).json(user);
}
