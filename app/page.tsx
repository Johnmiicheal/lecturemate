"use client";
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import React, { Suspense, useEffect } from "react";
import Head from "next/head";
import theme from "../themes";
import { useRouter } from "next/router";
import TopBarProgress from "react-topbar-progress-indicator";
import Landing from "./landing";
import Loading from "./loading";

function MyApp() {
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
          <title>Lecture Mate</title>
        </Head>
        <ChakraProvider theme={theme}>
          <Suspense fallback={<Loading />}>
            <Landing />
          </Suspense>
        </ChakraProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
