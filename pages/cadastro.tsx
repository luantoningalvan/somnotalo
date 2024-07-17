import React from "react";
import Head from "next/head";
import { SignUp } from "@clerk/nextjs";
import { Center, theme } from "@chakra-ui/react";
import { dark } from "@clerk/themes";

const Index = () => (
  <>
    <Head>
      <title>Som no Talo - O Streaming Oficial do MegaFunk</title>
      <meta
        name="description"
        content={`Descubra os melhores CDs e DJs do Brasil para você curtir e baixar`}
      />
    </Head>

    <Center minH="calc(100vh - 64px)">
      <SignUp
        appearance={{
          baseTheme: dark,
          variables: {
            colorBackground: "#191926",
            colorPrimary: theme.colors.blue[500],
            colorInputBackground: "rgba(0,0,0,0.1)",
          },
          layout: {
            socialButtonsVariant: "iconButton",
            logoPlacement: "none",
          },
        }}
        signInUrl="/entrar"
      />
    </Center>
  </>
);

export default Index;
