"use client";

import { Center, Flex, Text, Image, Box, Link, Icon } from "@chakra-ui/react";
import React, { Suspense, useState } from "react";
import Layout from "../../src/components/App/Layout";
import { IoPaperPlane, IoPaperPlaneOutline } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import LayoutProvider from "./LayoutProvider";
import TopBarProgress from "react-topbar-progress-indicator";
import Loading from "../loading";

const App = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleRoute = () => {
    router.push('/app/chat');
    if(pathname !== '/app/chat'){
      setLoading(true);
    }
  }

  return (
    <Suspense fallback={<Loading />}>
    <LayoutProvider>
      {loading && <TopBarProgress />}
      <Flex
        w="full"
        direction="column"
        justify="space-between"
        overflowX="hidden"
      >
        {/* <Layout /> */}
        <Flex direction="column" w="full" align="center" px={2}>
          <Flex
            direction="column"
            w={{ base: "full", lg: "1200px" }}
            mt={28}
            ml={{ base: "0", lg: "200px" }}
            align="center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Text
                fontSize="50"
                bgGradient="linear(to-r, #00F0FF, #53AF28)"
                bgClip="text"
                fontWeight={600}
              >
                Lecture Mate
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Image
                src="/guides.png"
                w={{ base: "800px", md: "800px", lg: "1000px" }}
                pointerEvents="none"
              />
            </motion.div>

            <Flex
              gap={4}
              mt={5}
              textAlign="center"
              direction={{ base: "column", lg: "row" }}
            >
              <Flex direction="column" w="300px" gap={5}>
                <Text fontSize={20} fontWeight={600}>
                  Usage
                </Text>
                <Box
                  bg="#E2F0E2"
                  display="flex"
                  alignItems="center"
                  height="100px"
                  px={2}
                  py={2}
                  borderRadius="md"
                  color="#333333"
                >
                  "Generate 3 theory questions on the topic [insert topic here]"{" "}
                </Box>
                <Box
                  bg="#E2F0E2"
                  display="flex"
                  alignItems="center"
                  height="100px"
                  px={2}
                  py={2}
                  borderRadius="md"
                  color="#333333"
                >
                  "List 10 items of [insert question] and explain them"
                </Box>
              </Flex>
              <Flex direction="column" w="300px" gap={5}>
                <Text fontSize={20} fontWeight={600}>
                  Tips
                </Text>
                <Box
                  bg="#E2F0E2"
                  display="flex"
                  alignItems="center"
                  height="100px"
                  px={2}
                  py={2}
                  borderRadius="md"
                  color="#333333"
                >
                  Always remember to copy the token before asking any question
                </Box>
                <Box
                  bg="#E2F0E2"
                  display="flex"
                  alignItems="center"
                  height="100px"
                  px={2}
                  py={2}
                  borderRadius="md"
                >
                  <Text>
                    Merged PDF is the best way to use Lecture Mate, you can
                    merge your pdfs{" "}
                    <Link
                      href="https://www.ilovepdf.com/merge_pdf"
                      target="_blank"
                      color="#005103"
                      fontWeight={600}
                    >
                      here
                    </Link>
                  </Text>
                </Box>
              </Flex>
              <Flex direction="column" w="300px" gap={5}>
                <Text fontSize={20} fontWeight={600}>
                  Limitations
                </Text>
                <Box
                  bg="#E2F0E2"
                  display="flex"
                  alignItems="center"
                  height="100px"
                  px={2}
                  py={2}
                  borderRadius="md"
                  color="#333333"
                >
                  Calculations are not supported yet, but we'll keep working on
                  that
                </Box>
                <Box
                  bg="#E2F0E2"
                  display="flex"
                  alignItems="center"
                  height="100px"
                  px={2}
                  py={2}
                  borderRadius="md"
                  color="#333333"
                >
                  File uploads are limited to one pdf per time, uploading might
                  take a while depending on the file size{" "}
                </Box>
              </Flex>
            </Flex>

            <Flex
              w={{ base: "full", md: "800px" }}
              mt={28}
              mb="14"
              boxShadow="md"
              justify="space-between"
              bg="#E2F0E2"
              color="#808680"
              _hover={{ border: "1px solid #005103 " }}
              p={5}
              borderRadius="md"
              cursor="pointer"
              onClick={handleRoute}
            >
              Start Chatting🚀
              <Icon as={IoPaperPlaneOutline} w="5" h="5" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </LayoutProvider>
    </Suspense>
  );
};

export default App;
