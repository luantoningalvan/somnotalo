import { prisma } from "../services/prisma";

interface GetAlbumsFilters {
  isSingle?: boolean;
  cursor?: number;
}

export async function getAlbums(query: any) {
  let filters: GetAlbumsFilters = {};
  const taxonomies = ["album", "music"];

  if (query.taxonomy && taxonomies.includes(query.taxonomy as string)) {
    filters.isSingle = query.taxonomy === "music" ? true : false;
  }

  const albums = await prisma.album.findMany({
    where: {
      ...filters,
      status: "PUBLISHED",
    },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
          slug: true,
          avatar: true,
        },
      },
    },
    take: 19,
    ...(query.cursor && {
      cursor: {
        id: Number(query.cursor),
      },
    }),
  });

  const lastPostInResults = albums[18];
  const paginationCursor = lastPostInResults?.id;

  return {
    albums: JSON.parse(JSON.stringify(albums)),
    paginationCursor,
  };
}

export async function getSingleAlbum(albumId: string, userId?: string) {
  const findAlbum = await prisma.album.findUnique({
    where: { slug: albumId as string },
    include: {
      author: true,
      songs: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!findAlbum) {
    return {
      error: {
        message: "Conteúdo não encontrado",
        statusCode: 404,
      },
    };
  }

  let isFavorite = false;

  if (userId) {
    const response = await prisma.favorites.findFirst({
      where: {
        albumId: Number(findAlbum.id),
        userId: userId,
      },
    });

    if (response) {
      isFavorite = true;
    }
  }

  const parsedAlbum = {
    ...findAlbum,
    isFavorite,
    songs: findAlbum.songs.map((song) => ({
      ...song,
      fileName: song.audioUrl,
      audioUrl: song.audioUrl,
      cover: findAlbum?.cover,
      artist: {
        ...findAlbum.author,
      },
    })),
  };

  return {
    data: JSON.parse(JSON.stringify(parsedAlbum)),
  };
}
