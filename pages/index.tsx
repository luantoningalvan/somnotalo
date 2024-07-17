import { GetServerSideProps } from "next";
import React from "react";

const Index = () => <></>;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: "/explorar",
    },
  };
};

export default Index;
