import { NextApiRequest, NextApiResponse } from "next";
import publishAlbum from "../../../../defer/publishAlbum";
import { prisma } from "../../../../src/services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.query;

    await prisma.album.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "PROCESSING",
      },
    });

    await publishAlbum(id as string);

    res.status(200).json({ ok: true });
  }

  return res.status(404).end();
}
