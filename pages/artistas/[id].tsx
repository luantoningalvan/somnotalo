import React from "react";
import SingleArtist from "../../src/containers/SingleArtist";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { getArtist } from "../../src/lib/artists";

const Index: NextPage<{ artist: any }> = ({ artist }) => {
  const title = `${artist.name} - Som no Talo`;
  const description = `Escute e baixe as melhores músicas de ${artist.name} em Som no Talo`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://somnotalo.com/artistas/${artist.slug}`}
        />
        <meta property="og:image" content={artist.cover} />
        <meta property="og:image:alt" content={artist.name} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="500" />
      </Head>
      <SingleArtist artist={artist} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const artistId: string = params.id as string;

  const { error, data } = await getArtist(artistId);

  if (error && error.statusCode === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: { artist: data },
  };
};

export default Index;
