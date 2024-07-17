import { NextApiRequest, NextApiResponse } from "next";
import { getFavoriteAlbums } from "../../../src/lib/favorites";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ status: "Unauthorized" });
  }

  const { data } = await getFavoriteAlbums(userId);

  return res.send(data);
}
