import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../src/services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { albumId, musicName, musicDuration, position } = req.body;

    const result = await prisma.song.create({
      data: {
        name: musicName,
        albumId: Number(albumId),
        audioUrl: `https://s3.us-east-1.wasabisys.com/somnotalo/songs/${albumId}/${musicName}`,
        duration: Math.round(Number(musicDuration)),
        position: Number(position),
      },
    });

    return res.status(200).json(result);
  }

  return res.status(404).end();
}
