import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { favoriteOrUnfavoriteAlbum } from "../../../src/lib/favorites";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  const { id: albumId } = req.query;

  if (!userId) {
    res.status(401).json({ status: "Unauthorized" });
    return;
  }

  if (req.method === "POST") {
    const { favoriteCount, favorited } = await favoriteOrUnfavoriteAlbum(
      Number(albumId),
      userId
    );

    return res.status(200).json({ favoriteCount, favorited });
  }

  return res.status(404).end();
}
