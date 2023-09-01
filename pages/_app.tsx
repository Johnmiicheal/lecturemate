/* eslint-disable @next/next/no-sync-scripts */
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import type { Metadata } from "next";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import theme from "../themes";
import Router, { useRouter } from "next/router";

import TopBarProgress from "react-topbar-progress-indicator";

export const metadata: Metadata = {
  title: "Lecture Mate AI",
  description:
    "Unlock the power of Knowledge with your AI powered study companion",
  icons: "../public/logo.png",
};

function MyApp({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = React.useState(false);
  Router.events.on("routeChangeStart", () => {
    setProgress(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setProgress(false);
  });
  TopBarProgress.config({
    barColors: {
      "0": "#008F06",
      "1.0": "#00F0FF",
    },
  });
  const [showChild, setShowChild] = React.useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <link rel="shortcut icon" href="/logo.png" />
          <link itemProp="image" href="../public/mock.png" />
          <title>Lecture Mate | Your AI Powered Study Companion</title>
          <meta name="description" content="Your AI Powered Study Companion" />
          <meta name="keywords" content="AI, Study, Lecture Mate, Exam Prep" />
          <meta name="author" content="Johnmicheal Elijah" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <ChakraProvider theme={theme}>
          {progress && <TopBarProgress />}
          <Component {...pageProps} />
        </ChakraProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
