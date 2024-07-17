import React from "react";
import Head from "next/head";
import { ArtistDashoard } from "../../src/containers/ArtistDashboard";
import { GetServerSideProps } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "../../src/services/prisma";

const Index = ({ data }) => (
  <>
    <Head>
      <title>Meu painel - Som no Talo</title>
    </Head>

    <ArtistDashoard data={data} />
  </>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  const getArtist = await prisma.artist.findFirst({
    where: {
      clerkId: userId,
    },
    include: {
      albums: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const statistics = await prisma.album.aggregate({
    where: {
      authorId: getArtist.id,
      status: "PUBLISHED",
    },
    _sum: {
      downloadsCount: true,
      favoriteCount: true,
    },
    _count: {
      _all: true,
    },
  });

  if (!getArtist) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: JSON.parse(
        JSON.stringify({
          artist: getArtist,
          statistics,
        })
      ),
    },
  };
};

export default Index;
