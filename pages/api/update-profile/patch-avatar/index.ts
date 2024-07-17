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
    const { avatar } = req.body;

    if (avatar === undefined || avatar === "") {
      return res.status(400).json({ error: "avatar is required" });
    }

    let newAvatar;
    if (avatar !== null) {
      const wasabi = new WasabiService();

      const random_sufix = Math.random().toString(36).substring(7);

      const saveImage = await wasabi.saveFile(
        `avatars/${userId}_${random_sufix}.jpg`,
        Buffer.from(avatar, "base64")
      );
      newAvatar = saveImage.Location;
    } else {
      newAvatar = null;
    }

    const result = await prisma.artist.update({
      where: {
        clerkId: userId,
      },
      data: {
        avatar: newAvatar,
      },
    });

    return res.status(200).json(result);
  }

  return res.status(404).end();
}
