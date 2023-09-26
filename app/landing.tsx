'use client'
import React, { Suspense } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Flex, Icon, Text, Image} from "@chakra-ui/react";
import Header from "../src/components/Web/Header";
import Footer from "../src/components/Web/Footer";
import { motion } from "framer-motion";
import { IoStar } from "react-icons/io5";
// import Loading from "./loading";


export default function Landing() {
  const router = useRouter();
  return (
    // <Suspense fallback={<Loading />}>
    <Flex direction="column">
      <Flex
        direction="column"
        px={{ base: 2, lg: 32 }}
        bg="white"
        boxShadow="md"
        zIndex={2}
      >
        <Header />
      </Flex>
      <Flex
        direction="column"
        align="center"
        bgImage="/herobg.png"
        bgSize="contain"
        bgPos="center"
        bgRepeat="no-repeat"
        h="80vh"
        overflow="hidden"
        gap={3}
      >
        <Flex gap="2" align="center">
          <Flex
            mt={{ base: 10, lg: 20 }}
            w="13rem"
            h="20px"
            gap={3}
            align="center"
            justify="center"
            bg="green.100"
            color="#53AF28"
            border="1px solid #53AF28"
            _hover={{ color: "#005103", bg: "#90E768" }}
            py={5}
            px={3}
            borderRadius="full"
            cursor="pointer"
            onClick={() =>
              router.push("https://github.com/johnmiicheal/lecturemate")
            }
          >
            Star us on Github
            <Icon as={IoStar} w="5" h="5" />
          </Flex>
        
        </Flex>
        <Flex direction="column" align="center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Text
              textAlign="center"
              fontWeight={600}
              fontSize={{ base: 20, md: 40 }}
              minW={{ base: "10rem", lg: "45rem" }}
              maxW={{ md: "45rem", lg: "45rem" }}
            >
              Unlock{" "}
              <Image
                src="/study.png"
                mb={{ base: -2, lg: -3 }}
                pointerEvents="none"
                alt="unlock"
                display="inline"
                maxH={{ base: "30px", md: "50px" }}
              />{" "}
              the Power of Knowledge with{" "}
              <Text
                bgGradient="linear(to-r, #00F0FF, #53AF28)"
                bgClip="text"
                fontSize={{ base: "xl", md: "5xl", lg: "5xl" }}
                fontWeight="extrabold"
                display="inline"
              >
                Lecture Mate
              </Text>
              <Image
                src="/mate.png"
                pointerEvents="none"
                mb={{ base: -2, lg: -3 }}
                ml={3}
                mr={2}
                alt="mate"
                display="inline"
                maxH={{ base: "30px", md: "50px" }}
              />
              Your AI-Powered Study Companion!
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: -20 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Box>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <Image
                  src="/lm-chat.png"
                  pointerEvents="none"
                  w="1000px"
                  alt="mock of lecture mate"
                />
              </motion.div>
            </Box>
          </motion.div>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
    // </Suspense>
  );
}
