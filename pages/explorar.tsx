import React from "react";
import Head from "next/head";
import Explore from "../src/containers/Explore";
import api from "../src/services/api";
import { GetServerSideProps } from "next";

const Index = ({ data }: any) => (
  <>
    <Head>
      <title>Som no Talo - O Streaming Oficial do MegaFunk</title>
      <meta
        name="description"
        content={`Descubra os melhores CDs e DJs do Brasil para você curtir e baixar`}
      />
      <meta
        property="og:title"
        content={`Som no Talo - O Streaming Oficial do MegaFunk`}
      />
      <meta
        property="og:description"
        content={`Descubra os melhores CDs e DJs do Brasil para você curtir e baixar`}
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://somnotalo.com`} />
      <meta
        property="og:image"
        content={`https://www.somnotalo.com/og-image.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
    <Explore data={data} />
  </>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const result = await api.get(`/explore`);
  return {
    props: { data: result.data },
  };
};

export default Index;
