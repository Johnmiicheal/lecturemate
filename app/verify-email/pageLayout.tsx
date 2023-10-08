import React from "react";
import {
  Flex,
  Center,
  Text,
  Image
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import Header from "../../src/components/Web/Header";

const EmailVerification = () => {
  return (
    <Center flexDir={"column"}>
      <Flex direction="column" align="center" mt={20} color="#000A16" gap="5">
        <Image src="logo.png" w="10%" alt="Lecture Mate Logo" pointerEvents={"none"} />
        <Text fontSize="22" fontWeight={700} textAlign={"center"}>Lecture Mate <br/>Email Verification</Text>
        <Player autoplay loop src="/dancingbook.json" style={{ width: "300px", height: "300px" }} />
        <Text fontWeight={600} w="500px" textAlign='center' fontSize="19">Thank you for registering to Lecture Mate, please check your email for the verification to continue.</Text>
      </Flex>
    </Center>
  );
};

export default EmailVerification;