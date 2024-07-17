import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/services/prisma";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const albums = await prisma.album.findMany({
    include: { author: true },
    where: { isSingle: false, status: "PUBLISHED" },
    take: 12,
    orderBy: { createdAt: "desc" },
  });

  const artists = await prisma.artist.findMany({
    include: { albums: true },
    take: 16,
  });

  res.send({
    newAlbums: albums,
    topArtists: artists,
  });
}
