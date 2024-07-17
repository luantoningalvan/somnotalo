import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../src/services/prisma";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { userId } = getAuth(req);
    const { name } = req.body;

    const result = await prisma.artist.update({
      where: {
        clerkId: userId,
      },
      data: {
        name,
      },
    });

    return res.status(200).json(result);
  }

  return res.status(404).end();
}
