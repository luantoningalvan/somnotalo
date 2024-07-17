import React from "react";
import Template from "../src/components/Template";
import AppProvider from "../src/hooks";
import Router from "next/router";
import NProgress from "nprogress";
import CookieConsent from "react-cookie-consent";
import { Box, ChakraProvider, Heading, Image, Text } from "@chakra-ui/react";
import { SidebarDrawerProvider } from "../src/components/Template/context";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { theme } from "../src/global/theme";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

import "nprogress/nprogress.css";
import { GlobalStyle } from "../src/components/Template/styles";
import Head from "next/head";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  if (process.env.NEXT_PUBLIC_IS_IN_MAINTENANCE === "true") {
    return (
      <ChakraProvider resetCSS theme={theme}>
        <Head>
          <title>Som no Talo - Em construção</title>
          <meta
            name="description"
            content={`Em breve, você terá acesso à maior plataforma de divulgação de DJs do Brasil`}
          />
          <meta property="og:title" content={`Som no Talo - Em construção`} />
          <meta
            property="og:description"
            content={`Em breve, você terá acesso à maior plataforma de divulgação de DJs do Brasil`}
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

        <GlobalStyle />

        <Box
          w="100vw"
          h="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
        >
          <Image h="64px" src="/logo.svg" alt="Logo Som no Talo" />

          <Heading size="lg" mt={8}>
            Estamos em construção
          </Heading>
          <Text mt={2}>
            Em breve, você terá acesso à maior plataforma de divulgação de DJs
            do Brasil.
          </Text>
        </Box>
      </ChakraProvider>
    );
  }

  return (
    <ClerkProvider localization={ptBR} {...pageProps}>
      <ChakraProvider resetCSS theme={theme}>
        <AppProvider>
          <Toaster />
          <CookieConsent
            style={{
              margin: 24,
              background: "#282840",
              width: "calc(100vw - 48px)",
              borderRadius: 8,
            }}
            buttonStyle={{
              background: "#3182ce",
              color: "white",
              fontWeight: "bold",
              textTransform: "normal",
              borderRadius: 4,
              padding: 8,
            }}
            buttonText="Eu compreendo"
          >
            Esse site utiliza cookies para melhorar a sua experiência
          </CookieConsent>

          <SidebarDrawerProvider>
            <Template>
              <Component {...pageProps} />
              <Analytics />
            </Template>
          </SidebarDrawerProvider>
        </AppProvider>
      </ChakraProvider>
    </ClerkProvider>
  );
}
