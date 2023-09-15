"use client";
import {
  ChakraProvider,
  ThemeProvider,
  Box,
  Center,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Head from "next/head";
import theme from "../../themes";
import Router, { useRouter } from "next/router";
import TopBarProgress from "react-topbar-progress-indicator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to Lecture Mate",
  description: "Lecture is now your mate",
};

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
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
        <ChakraProvider theme={theme}>
          {progress && <TopBarProgress />}
          <Center>
            <Box minH="100vh" minW="full" bgColor="white" bgSize="cover">
              <Flex justify="center">{children}</Flex>
            </Box>
          </Center>
        </ChakraProvider>
      </ThemeProvider>
    );
  }
}
