import React, { Box } from "@chakra-ui/react";
import { Flex, Center, Text, Image } from "@chakra-ui/react";
import Header from "../src/components/Web/Header";

export default function Home() {
  return (
    <Flex direction="column">
      <Flex direction="column" px={10} bg="white" border="2px solid #DBDBDB">
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
        <Flex mt={20} direction="column" align="center">
          <Text textAlign="center" fontWeight={500} fontSize={40} w="45rem">
              Unlock <Image src="/study.png" mb={-3} alt="unlock" display="inline" maxH="50px"/> the Power of
              Knowledge with <Text fontWeight={700} display="inline">Lecture Mate</Text> 
              <Image src="/mate.png" mb={-3} ml={3} mr={2} alt="mate" display="inline" maxH="50px" />
              Your AI-Powered Study Companion!
          </Text>
          <Box>
            <Image src="/mock.png" w="900px" alt="mock of lecture mate" />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
