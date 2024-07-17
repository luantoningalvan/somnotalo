import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../src/services/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { parsePhoneNumber } from "libphonenumber-js";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { userId } = getAuth(req);
    const { contacts } = req.body;

    if (contacts === undefined || contacts === "") {
      return res.status(400).json({ error: "contacts is required" });
    }

    if (contacts.whatsapp) {
      const phone = parsePhoneNumber(contacts.whatsapp, "BR").number;
      contacts.whatsapp = phone;
    }

    if (contacts.telegram) {
      const phone = parsePhoneNumber(contacts.telegram, "BR").number;
      contacts.telegram = phone;
    }

    const result = await prisma.artist.update({
      where: {
        clerkId: userId,
      },
      data: {
        contacts: JSON.stringify(contacts),
      },
    });

    return res.status(200).json(result);
  }

  return res.status(404).end();
}
