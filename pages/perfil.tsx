import React from "react";
import Head from "next/head";
import { UserProfile } from "@clerk/nextjs";
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

    <Center py={8} overflow="hidden">
      <UserProfile
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
      />
    </Center>
  </>
);

export default Index;
