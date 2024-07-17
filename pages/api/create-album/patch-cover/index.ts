import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../src/services/prisma";
import { WasabiService } from "../../../../src/services/wasabi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { albumId, image } = req.body;

    const wasabi = new WasabiService();

    const random_sufix = Math.random().toString(36).substring(7);

    const saveImage = await wasabi.saveFile(
      `covers/${albumId}_${random_sufix}.jpg`,
      Buffer.from(image, "base64")
    );

    const result = await prisma.album.update({
      where: {
        id: Number(albumId),
      },
      data: {
        cover: saveImage.Location,
      },
    });

    return res.status(200).json(result);
  }

  return res.status(404).end();
}
