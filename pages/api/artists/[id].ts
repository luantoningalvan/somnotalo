import { NextApiRequest, NextApiResponse } from "next";
import { getArtist } from "../../../src/lib/artists";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id: artistSlug } = req.query;

    const { data, error } = await getArtist(artistSlug as string);

    if (error) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    return res.status(200).json(data);
  }

  return res.status(404).end();
}
