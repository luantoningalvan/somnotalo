import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { getSingleAlbum } from "../../../src/lib/albums";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  const { id: albumId } = req.query;

  const { error, data } = await getSingleAlbum(albumId as string, userId);

  if (error) {
    return res.status(error.statusCode).send({ error: error.message });
  }

  res.send(data);
}
