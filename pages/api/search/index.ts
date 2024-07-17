import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/services/prisma";

type Filters = {
  search: string;
  only?: "albums" | "artists";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let filters: Filters = {} as Filters;

  if (!req.query.s) {
    return res.status(400).send("Missing search query");
  }

  filters.search = req.query.s as string;

  if (req.query.only) {
    filters.only = req.query.only as Filters["only"];
  }

  const albums = await prisma.album.findMany({
    where: {
      name: {
        search: filters.search,
      },
    },
    orderBy: {
      _relevance: {
        search: filters.search,
        fields: ["name"],
        sort: "desc",
      },
    },
    include: { author: true },
    take: 20,
  });

  const artists = await prisma.artist.findMany({
    where: {
      name: {
        search: filters.search,
      },
    },
    orderBy: {
      _relevance: {
        search: filters.search,
        fields: ["name"],
        sort: "desc",
      },
    },
    take: 20,
  });

  return res.send({
    albums,
    artists,
  });
}
