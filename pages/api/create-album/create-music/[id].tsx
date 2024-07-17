import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../src/services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    await prisma.song.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(204).end();
  }

  return res.status(404).end();
}
