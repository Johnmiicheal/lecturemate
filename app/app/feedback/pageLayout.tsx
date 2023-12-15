import { Center, Flex, Text, Image, Box, Link, Icon } from "@chakra-ui/react";
import React from "react";
import Layout from "../../../src/components/App/Layout";

const Feedback = () => {
  return (
    <Flex
      w="full"
      direction="column"
      justify="space-between"
      overflowX="hidden"
    >
      {/* <Layout /> */}
      <Flex direction="column" w="full" h="100vh" bg="white" align="center">
        <iframe
          width="100%"
          height="100%"
          src="https://forms.office.com/r/xw8mcYPXLp?embed=true"
          allowFullScreen
        >
        </iframe>
      </Flex>
    </Flex>
  );
};

export default Feedback;
