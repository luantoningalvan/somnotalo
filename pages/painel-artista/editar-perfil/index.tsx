import React from "react";
import Head from "next/head";
import { EditArtistProfile } from "../../../src/containers/EditArtistProfile";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "../../../src/services/prisma";

const Index = ({ artist }) => (
  <>
    <Head>
      <title>Editar Perfil - Som no Talo</title>
    </Head>

    <EditArtistProfile artist={artist} />
  </>
);

export async function getServerSideProps(context) {
  const { userId } = getAuth(context.req);

  if (!userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const findArtist = await prisma.artist.findFirst({
    where: {
      clerkId: userId,
    },
  });

  if (!findArtist) {
    return {
      notFound: true,
    };
  }

  // parse contacts
  const contacts = Object.entries(JSON.parse(findArtist.contacts)).map(
    ([key, value]) => {
      return {
        type: key,
        value,
      };
    }
  );

  const artistWithParsedData = {
    name: findArtist.name,
    avatar: findArtist.avatar,
    cover: findArtist.cover,
    contacts,
  };

  return {
    props: { artist: JSON.parse(JSON.stringify(artistWithParsedData)) },
  };
}

export default Index;
