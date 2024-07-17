import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../src/services/prisma";
import slugify from "slugify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { albumId, name } = req.body;

    const createSlug = slugify(name, {
      lower: true,
      strict: true,
    });

    const result = await prisma.album.update({
      where: {
        id: Number(albumId),
      },
      data: {
        name,
        slug: createSlug,
      },
    });

    return res.status(200).json(result);
  }

  return res.status(404).end();
}
