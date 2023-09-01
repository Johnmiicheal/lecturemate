import {
  Center,
  Flex,
  Text,
  Image,
  Box,
  Link,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
  AlertDialogFooter,
} from "@chakra-ui/react";
import React from "react";
import Layout from "../src/components/App/Layout";
import { IoChevronForward, IoPaperPlane, IoPaperPlaneOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Head from "next/head";

const App = () => {
  const router = useRouter();
  const {onOpen, isOpen, onClose} = useDisclosure()
  return (
    <>
    <Head>
      <title>Home - Lecture Mate</title>
    </Head>
    <Flex
      w="full"
      direction="column"
      justify="space-between"
      overflowX="hidden"
    >
      <Layout />
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
                  Merged PDF is the best way to use Lecture Mate, you can merge
                  your pdfs{" "}
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
            // onClick={() => router.push("/app/chat")}
            onClick={onOpen}
          >
            Start Chatting🚀
            <Icon as={IoPaperPlaneOutline} w="5" h="5" />
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", lg: "lg" }}>
        <ModalOverlay />
        <ModalContent
          minW={{ base: "10rem", lg: "33rem" }}
          minH="20rem"
          borderColor="white"
          borderRadius="10px"
        >
          <ModalHeader
            borderRadius="10px 10px 0 0 "
            // bgGradient="linear(to-l, #00F0FF, #53AF28)"
            bgColor="#53AF28"
          >
            Lecture Mate - Waitlist
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={7}>
            <Alert
              status="info"
              variant="left-accent"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              bg="white"
              border="white"
            >
              <AlertTitle mb={1} fontSize="lg">
                Hi there👋
              </AlertTitle>
              <AlertDescription maxWidth="lg" textAlign="justify">
                We are working hard and fast to deliver to you a seamless
                experience. Don't worry, we'll be ready sooner than you expect
                it🚀
                <br />
                <br />
                In the mean time, why not join our community to get updates about Lecture Mate
              </AlertDescription>
              <AlertDialogFooter>
                <Button
                  variant="solid"
                  borderRadius="full"
                  px={4}
                  color="white"
                  bg="#202020"
                  _hover={{ bgGradient: "linear(to-l, #00F0FF, #53AF28)" }}
                  rightIcon={<IoChevronForward />}
                  fontWeight={500}
                  fontSize={14}
                  onClick={() => router.push("https://t.me/NEARCommunity")}
                 
                >
                  Join Community
                </Button>
              </AlertDialogFooter>
            </Alert>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
    </>
  );
};

export default App;
