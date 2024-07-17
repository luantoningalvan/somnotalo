import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getFavoriteAlbums } from "../src/lib/favorites";
import { getAuth } from "@clerk/nextjs/server";
import Favorites, { FavoritesProps } from "../src/containers/Favorites";

const Index = ({ initialData }: FavoritesProps) => (
  <>
    <Head>
      <title>Favoritos - Som no Talo</title>
    </Head>
    <Favorites initialData={initialData} />
  </>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  if (!userId) {
    return {
      redirect: {
        destination: "/entrar",
        permanent: false,
      },
    };
  }

  const { data } = await getFavoriteAlbums(userId);

  return {
    props: {
      initialData: {
        albums: data,
      },
    },
  };
};

export default Index;
