'use client'
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import React, {useEffect} from "react";
import Head from "next/head";
import theme from "../../../themes";
import Router, { useRouter } from "next/router";
import TopBarProgress from "react-topbar-progress-indicator"
import PageLayout from "./pageLayout"

function MyApp() {
    const [progress, setProgress] = React.useState(false)
    Router.events.on("routeChangeStart", () => { setProgress(true) })
    Router.events.on("routeChangeComplete", () => { setProgress(false) })
    TopBarProgress.config({
      barColors: {
        "0": "#008F06",
        "1.0": "#00F0FF"
      }
    })
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
              {progress && <TopBarProgress />}
            <PageLayout />
          </ChakraProvider>
          
          </ThemeProvider>
      );
    }
  }
  
  
  export default MyApp;