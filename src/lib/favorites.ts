import { prisma } from "../services/prisma";

export async function favoriteOrUnfavoriteAlbum(
  albumId: number,
  userId: string
) {
  const findFavorite = await prisma.favorites.findFirst({
    where: {
      albumId: Number(albumId),
      userId: userId,
    },
  });

  if (findFavorite) {
    const [_favorite, album] = await prisma.$transaction([
      prisma.favorites.delete({
        where: {
          id: findFavorite.id,
        },
      }),
      prisma.album.update({
        where: {
          id: Number(albumId),
        },
        data: {
          favoriteCount: {
            decrement: 1,
          },
        },
      }),
    ]);

    return {
      favoriteCount: album.favoriteCount,
      favorited: false,
    };
  } else {
    const [_favorite, album] = await prisma.$transaction([
      prisma.favorites.create({
        data: {
          albumId: Number(albumId),
          userId: userId,
        },
      }),
      prisma.album.update({
        where: {
          id: Number(albumId),
        },
        data: {
          favoriteCount: {
            increment: 1,
          },
        },
      }),
    ]);

    return {
      favoriteCount: album.favoriteCount,
      favorited: true,
    };
  }
}

export async function getFavoriteAlbums(userId: string) {
  const favorites = await prisma.favorites.findMany({
    where: {
      userId: userId,
    },
    include: {
      album: {
        include: {
          author: true,
        },
      },
    },
  });

  const albums = favorites.map((favorite) => favorite.album);

  return { data: JSON.parse(JSON.stringify(albums)) };
}
