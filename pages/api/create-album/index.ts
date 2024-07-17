import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/services/prisma";
import { getAuth } from "@clerk/nextjs/server";

import slugify from "slugify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name } = req.body;
    const { userId } = getAuth(req);

    const getArtist = await prisma.artist.findFirst({
      where: {
        clerkId: userId,
      },
    });

    if (!getArtist) {
      return res.status(404).end();
    }

    const createSlug = slugify(name, {
      lower: true,
      strict: true,
    });

    const result = await prisma.album.create({
      data: {
        name: name,
        slug: createSlug,
        authorId: getArtist.id,
      },
    });

    return res.status(201).json(result);
  }

  return res.status(404).end();
}
