import React from "react";
import Head from "next/head";
import Search from "../src/containers/Search";
import api from "../src/services/api";
import { Album, Artist } from ".prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

interface ApiResult {
  data: {
    albums: Album[];
    artists: Artist[];
    search: string;
  };
}

const Index: NextPage<ApiResult> = ({ data }) => {
  const { query } = useRouter();
  return (
    <>
      <Head>
        <title>{query.s} - Som no Talo</title>
      </Head>

      <Search data={data} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = await api.get(`/search`, {
    params: {
      s: ctx.query.s,
    },
  });

  return {
    props: { data: { ...result.data, search: ctx.query.s } },
  };
};

export default Index;
