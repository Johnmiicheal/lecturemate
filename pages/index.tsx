import React, { Box } from "@chakra-ui/react";
import { Flex, Center, Text, Image } from "@chakra-ui/react";
import Header from "../src/components/Web/Header";
import Footer from "../src/components/Web/Footer";
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Flex direction="column">
      <Flex
        direction="column"
        px={{ base: 2, lg: 20 }}
        bg="white"
        border="2px solid #DBDBDB"
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
      >
        <Flex mt={{ base: 10, lg: 20 }} direction="column" align="center">
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
            />
           {" "}
            the Power of Knowledge with{" "}
            <Text
             bgGradient= "linear(to-r, #00F0FF, #53AF28)"
              bgClip="text"
              fontSize={{ base: 'xl', md: '5xl', lg: "5xl" }}
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
          src="/mock.png"
          pointerEvents="none"
          w="900px"
          alt="mock of lecture mate"
        />
      </motion.div>
    </Box>
    </motion.div>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
}
