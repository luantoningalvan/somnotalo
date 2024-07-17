import React from "react";
import Head from "next/head";
import {
  NewAlbum,
  NewAlbumProps,
  Step,
} from "../../../src/containers/NewAlbum";
import { prisma } from "../../../src/services/prisma";

const Index = ({ album, step, initialSteps }: NewAlbumProps) => (
  <>
    <Head>
      <title>Novo álbum - Som no Talo</title>
    </Head>

    <NewAlbum album={album} step={step} initialSteps={initialSteps} />
  </>
);

export async function getServerSideProps({ query }) {
  const { id, step: queryStep } = query;

  let initialSteps: Step[] = [
    {
      label: "Informações gerais",
      done: false,
    },
    {
      label: "Capa",
      done: false,
    },
    {
      label: "Músicas",
      done: false,
    },
  ];
  let step = queryStep || 0;
  let album = null;

  if (id) {
    const getAlbum = await prisma.album.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        songs: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    if (getAlbum.name) {
      initialSteps[0].done = true;
    }

    if (getAlbum.cover) {
      initialSteps[1].done = true;
    }

    album = JSON.parse(JSON.stringify(getAlbum));
  }

  return {
    props: { step, album, initialSteps },
  };
}

export default Index;
