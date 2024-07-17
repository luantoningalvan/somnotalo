import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../src/services/prisma";
import { WasabiService } from "../../../../src/services/wasabi";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { userId } = getAuth(req);
    const { banner } = req.body;

    if (banner === undefined || banner === "") {
      return res.status(400).json({ error: "banner is required" });
    }

    let newBanner;
    if (banner !== null) {
      const wasabi = new WasabiService();

      const random_sufix = Math.random().toString(36).substring(7);

      const saveImage = await wasabi.saveFile(
        `avatars/cover_${userId}_${random_sufix}.jpg`,
        Buffer.from(banner, "base64")
      );
      newBanner = saveImage.Location;
    } else {
      newBanner = null;
    }

    const result = await prisma.artist.update({
      where: {
        clerkId: userId,
      },
      data: {
        cover: newBanner,
      },
    });

    return res.status(200).json(result);
  }

  return res.status(404).end();
}
