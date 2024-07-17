import { NextApiRequest, NextApiResponse } from "next";
import { WasabiService } from "../../../../src/services/wasabi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { albumId, fileName, duration, fileType } = req.body;

    const wasabiService = new WasabiService();

    const uploadUrl = await wasabiService.generateSignedUrl(
      `songs/${albumId}/${fileName}`,
      fileType,
      {
        "x-amz-meta-duration": String(duration),
      }
    );

    return res.status(200).json({ uploadUrl });
  }

  return res.status(404).end();
}
