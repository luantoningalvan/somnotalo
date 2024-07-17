import Head from "next/head";
import React from "react";
import SingleAlbum from "../../src/containers/SingleAlbum";
import { GetServerSideProps, NextPage } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { getSingleAlbum } from "../../src/lib/albums";

const Index: NextPage<{ album: any }> = ({ album }) => {
  const description = `Baixe ou escute grátis agora mesmo ${
    album.name
  } em Som no Talo · ${album.author.name} · ${new Date(
    album.createdAt
  ).getFullYear()} · ${album.songs.length} músicas`;

  const title = `${album.name} por ${album.author.name}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          property="og:title"
          content={`${album.name} por ${album.author.name}`}
        />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://somnotalo.com/albums/${album.slug}`}
        />
        <meta property="og:image" content={album.cover} />
        <meta property="og:image:alt" content={album.name} />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta property="og:site_name" content="Som no Talo" />
        <meta property="og:locale" content="pt_BR" />
      </Head>
      <SingleAlbum album={album} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);
  const { id: albumId } = ctx.query;

  const { error, data } = await getSingleAlbum(albumId as string, userId);

  if (error && error.statusCode === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: { album: data },
  };
};

export default Index;
