import React from "react";
import Head from "next/head";
import { SignIn } from "@clerk/nextjs";
import { Center, theme } from "@chakra-ui/react";
import { dark } from "@clerk/themes";
import { useSearchParams } from "next/navigation";

const Index = () => {
  const params = useSearchParams();

  return (
    <>
      <Head>
        <title>Som no Talo - O Streaming Oficial do MegaFunk</title>
        <meta
          name="description"
          content={`Descubra os melhores CDs e DJs do Brasil para você curtir e baixar`}
        />
      </Head>

      <Center minH="calc(100vh - 64px)">
        <SignIn
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
          signUpUrl="/cadastro"
          afterSignInUrl={params.get("redirect") || "/explorar"}
        />
      </Center>
    </>
  );
};

export default Index;
