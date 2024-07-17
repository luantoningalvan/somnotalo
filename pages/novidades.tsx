import React from "react";
import Head from "next/head";
import RecentReleased, { AlbumsProps } from "../src/containers/RecentReleased";
import { GetServerSideProps } from "next";
import { getAlbums } from "../src/lib/albums";

const Index = ({ initialData }: AlbumsProps) => (
  <>
    <Head>
      <title>Novidades - Som no Talo</title>
      <meta
        name="description"
        content={`Confira tudo que é lançamento no site Som no Talo`}
      />
    </Head>
    <RecentReleased initialData={initialData} />
  </>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { albums, paginationCursor } = await getAlbums(ctx.query);

  const hasMore = !!paginationCursor;

  return {
    props: {
      initialData: {
        albums,
        hasMore,
        nextCursor: hasMore ? Number(paginationCursor) : null,
      },
    },
  };
};

export default Index;
