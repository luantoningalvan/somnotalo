import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../src/services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const findArtistByClerk = await prisma.artist.findFirst({
    where: { clerkId: id as string },
  });

  res.send({ exists: !!findArtistByClerk });
}
