import { prisma } from "../services/prisma";

export async function getArtist(slug: string) {
  const findArtist = await prisma.artist.findFirst({
    where: { slug: slug },
    include: {
      albums: {
        where: {
          status: "PUBLISHED",
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!findArtist) {
    return {
      error: {
        message: "Conteúdo não encontrado",
        statusCode: 404,
      },
    };
  }

  const parsedArtist = {
    ...findArtist,
    contacts: findArtist.contacts ? JSON.parse(findArtist.contacts) : null,
  };

  return {
    data: JSON.parse(JSON.stringify(parsedArtist)),
  };
}
