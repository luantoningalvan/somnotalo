import { NextApiRequest, NextApiResponse } from "next";
import { getAlbums } from "../../../src/lib/albums";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { albums, paginationCursor } = await getAlbums(req.query);

    if (!!paginationCursor) {
      res.setHeader("X-Pagination-Cursor", String(paginationCursor));
    }

    return res.send(albums);
  }

  return res.status(404).end();
}
