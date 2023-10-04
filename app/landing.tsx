"use client";
import React, { Suspense, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Center,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import { Flex, Icon, Text, Image } from "@chakra-ui/react";
import Header from "../src/components/Web/Header";
import Footer from "../src/components/Web/Footer";
import { motion } from "framer-motion";
import { IoArrowForward, IoStar } from "react-icons/io5";
import {
  PiArrowUpRight,
  PiArrowRight,
  PiArrowRightBold,
  PiArrowUpRightBold,
} from "react-icons/pi";
import Loading from "./loading";
import TopBarProgress from "react-topbar-progress-indicator";
import { Player } from "@lottiefiles/react-lottie-player";
import styles from "../styles/Chat.module.css";

export default function Landing() {
  const router = useRouter();
  const pathname = usePathname();
  const scrollToAnchor = () => {
    const anchorDiv = document.getElementById("features");
    if (anchorDiv) {
      anchorDiv.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [loading, setLoading] = useState(false);
  const handleRoute = () => {
    router.push('/app');
    if(pathname !== '/app'){
      setLoading(true);
    }
  }
  return (
    <Suspense fallback={<Loading />}>
      {loading && <TopBarProgress />}
      <Center flexDirection="column" bg="#1C1D1E" overflow="hidden" pb={20} px={2}>
        <Flex
          direction="column"
          w="full"
          px={{ base: 2, lg: 20 }}
          py={5}
          zIndex={2}
          pos="fixed"
          top={0}
        >
          <Header />
        </Flex>

        {/* STARRY HOME SECTION 🌟💫✨ */}

        <Flex
          direction="column"
          align="center"
          color="white"
          bgImage="/lmstarr.png"
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
          w="full"
          id="home"
          gap={3}
        >
          <Flex gap="2" align="center">
            <Flex
              mt={32}
              w="13rem"
              h="20px"
              gap={3}
              transition="0.5s ease"
              align="center"
              justify="center"
              bg="#2F2F2F"
              color="#FFFFFF"
              border="1px solid #8D8D8D"
              _hover={{ color: "#FFFFFF", bg: "#454545" }}
              py={5}
              px={3}
              borderRadius="full"
              cursor="pointer"
              onClick={() =>
                router.push("https://github.com/johnmiicheal/lecturemate")
              }
            >
              Star us on Github
              <Icon as={IoStar} color="#53AF28" w="5" h="5" />
            </Flex>
          </Flex>
          <Flex direction="column" align="center" mt={{ base: 5 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Text
                textAlign="center"
                fontWeight="extrabold"
                fontSize={{ base: 20, md: "3.2em" }}
                minW={{ base: "10rem", lg: "45rem" }}
                maxW={{ md: "45rem", lg: "55rem" }}
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
                  fontSize={{ base: "xl", md: "5xl", lg: "6xl" }}
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
            <ButtonGroup mt={5} mb={5}>
              <Button
                bg="#2F2F2F"
                color="white"
                rightIcon={<PiArrowRightBold />}
                fontWeight={500}
                _hover={{ bg: "#333333" }}
                onClick={scrollToAnchor}
              >
                Learn more
              </Button>
              <Button
                bg="#005103"
                color="white"
                rightIcon={<PiArrowUpRightBold />}
                fontWeight={500}
                _hover={{ bg: "#016706" }}
                onClick={handleRoute}
                isLoading={loading}
              >
                Sign Up
              </Button>
            </ButtonGroup>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: -20 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <Flex justify="center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                >
                  <Image
                    src="/lmglow.png"
                    pointerEvents="none"
                    w="6xl"
                    alt="mock of lecture mate"
                  />
                </motion.div>
              </Flex>
            </motion.div>
          </Flex>
        </Flex>
        {/* <Footer /> */}

        {/* FEATURES BENTOO GRID 😎😍 */}

        <Flex
          id="features"
          color="white"
          mt={{ lg: 20 }}
          direction="column"
          align="center"
        >
          <Text
            fontSize={{ base: "xl", md: "4xl", lg: "4xl" }}
            fontWeight={"extrabold"}
            w={{ base: "20rem", md: "30rem", lg: "35rem" }}
            textAlign="center"
          >
            Creating a new learning experience for Students
          </Text>

          <SimpleGrid>
            <Flex mt={10} mb={10} gap={3} direction={{ base: "column", lg: "row" }}>
              <Flex direction="column" align="center" justify={{ base: "center", lg: "start"}} gap={3}>
                <VStack
                  p={6}
                  border="2px solid #333333"
                  _hover={{ border: "2px solid #434343" }}
                  bgImg="/filebg.png"
                  bgSize="auto"
                  bgPos="center -95px"
                  bgRepeat="no-repeat"
                  borderRadius="20px"
                  align="start"
                  h={{ lg: "20em" }}
                  w={{ base: "22em", md: "30rem", lg: "30em" }}
                  overflow="hidden"
                  transition="0.4s ease"
                >
                  <Image
                    src="/icons/lmupload.png"
                    w="15%"
                    alt="Lecture mate file upload icon"
                  />
                  <Text fontSize={20} fontWeight={600}>
                    File Upload
                  </Text>
                  <Text w={{ base: "18em" , md: "25rem", lg: "25em"}} fontSize={16}>
                    Create a personalized chat session by uploading your lecture
                    notes and you can ask any question based on your lectures.
                  </Text>
                </VStack>
                <HStack
                  p={6}
                  border="2px solid #333333"
                  _hover={{ border: "2px solid #434343" }}
                  bg="#252525"
                  borderRadius="20px"
                  align="center"
                  spacing={4}
                  h={{ lg: "9em" }}
                  w={{ base: "22em",  md: "30rem", lg: "30em" }}
                  overflow="hidden"
                  transition="0.4s ease"
                >
                  <Image
                    src="/icons/lmbudget.png"
                    w="15%"
                    alt="Lecture mate file upload icon"
                  />
                  <VStack align="start">
                    <Text fontSize={20} fontWeight={600}>
                      Budget Friendly Pricing
                    </Text>
                    <Text w="19em" fontSize={16}>
                      Lecture Mate offers premium services at the cheapest
                      prices, easy on your pocket
                    </Text>
                  </VStack>
                </HStack>
                <HStack
                  p={6}
                  border="2px solid #333333"
                  _hover={{ border: "2px solid #53AF28" }}
                  bg="#252525"
                  borderRadius="20px"
                  align="center"
                  spacing={4}
                  h={{ lg: "9em" }}
                  w={{ base: "22em",  md: "30em", lg: "30em" }}
                  overflow="hidden"
                  transition="0.4s ease"
                  cursor="pointer"
                  onClick={() => router.push("https://t.me/NEARCommunity")}
                >
                  <Image
                    src="/icons/lmgroup.png"
                    w="15%"
                    alt="Lecture mate file upload icon"
                  />
                  <VStack align="start">
                    <Text fontSize={20} fontWeight={600}>
                      Thriving Community
                    </Text>
                    <Text w="19em" fontSize={16}>
                      Join our community to receive the latest tips and updates
                    </Text>
                  </VStack>
                </HStack>
              </Flex>

              <Flex direction="column" align="center" gap={3}>
                <Flex gap={3} direction={{ base: "column", lg: "row" }}>
                  <VStack
                    p={6}
                    border="2px solid #333333"
                    _hover={{ border: "2px solid #434343" }}
                    bg="#252525"
                    borderRadius="20px"
                    align="center"
                    spacing={4}
                    h={{ lg: "20em" }}
                    w={{ base: "22em",  md: "30em",lg: "22em" }}
                    overflow="hidden"
                    transition="0.4s ease"
                  >
                    <Image
                      src="/icons/lmquiz.png"
                      w={{ base: "15%", lg: '20%'}}
                      alt="Lecture mate file upload icon"
                    />
                    <Text fontSize={20} fontWeight={600}>
                      Quizzes & Flash Cards
                    </Text>
                    <Text w="14em" fontSize={16} textAlign="center">
                      Generate quizzes and flash cards to upgrade your learning
                      and study experience
                    </Text>
                  </VStack>
                  <VStack
                    p={6}
                    border="2px solid #333333"
                    _hover={{ border: "2px solid #434343" }}
                    bg="#252525"
                    borderRadius="20px"
                    align="center"
                    spacing={4}
                    h={{ lg: "20em" }}
                    w={{ base: "22em", md: "30em", lg: "22em" }}
                    overflow="hidden"
                    transition="0.4s ease"
                  >
                    <Image
                      src="/icons/lmauth.png"
                      w={{ base: "15%", lg: '20%'}}
                      alt="Lecture mate file upload icon"
                    />
                    <Text fontSize={20} fontWeight={600}>
                      Authentication
                    </Text>
                    <Text w="14em" fontSize={16} textAlign="center">
                      We made sure to give you a secure and unique experience by
                      requiring user authentication
                    </Text>
                  </VStack>
                </Flex>
                <VStack
                  p={6}
                  border="2px solid #333333"
                  _hover={{ border: "2px solid #434343" }}
                  bgImg="/lmaibg.png"
                  bgSize="auto"
                  borderRadius="20px"
                  align="start"
                  spacing={4}
                  h={{ base: "25em", lg: "18.7em" }}
                  w={{ base: "22em", md: "30em", lg: "45em" }}
                  overflow="hidden"
                  transition="0.4s ease"
                >
                  <Image
                    src="/icons/lmai.png"
                    w={{ base: "15%", lg: '10%'}}
                    alt="Lecture mate file upload icon"
                  />
                  <Text fontSize={20} fontWeight={600}>
                    Powered by Artificial Intelligence
                  </Text>
                  <Flex direction={{ base: "column", lg: "row"}}>
                    <Text w={{ base: "20em",md: "25em", lg: "25em"}} fontSize={16} textAlign="start">
                      Lecture Mate utilizes artificial intelligence algorithms
                      to analyze lecture content and provide real-time insights
                      and suggestions, helping students to grasp complex
                      concepts more effectively.
                    </Text>
                    <Flex mt={{ base: -14, md: -28, lg: -44}} ml={{ lg: -10 }}>
                      <Player
                        autoplay={true}
                        controls={true}
                        loop
                        speed={0}
                        src="/AILOTTIE.json"
                        className={styles.ailottie}
                      />
                    </Flex>
                  </Flex>
                </VStack>
              </Flex>
            </Flex>
          </SimpleGrid>
        </Flex>

        {/* VISION STATEMENT 💡 */}
        <Flex
          color="white"
          id="vision"
          mt={{ base: 24, lg: 60 }}
          direction="column"
          align="center"
        >
          <Text
            fontSize={{ base: "xl", md: "4xl", lg: "4xl" }}
            fontWeight={"extrabold"}
            w={{ base: "20em", lg: "35rem"}}
            textAlign="center"
          >
            Are we going to the Moon? 🚀
          </Text>
          <Text mt={10} w={{ base: "20em", md: "30em", lg: "40rem"}} fontSize={16} textAlign="justify">
            Lecture Mate was created at Covenant University by an initial team
            of 2 developers and has steadily grown into a team of 6 including
            what we call a hype team.
          </Text>
          <Text mt={4}  w={{ base: "20em", md: "30em", lg: "40rem"}} fontSize={16} textAlign="justify">
            Lecture Mate is a startup company that aims to be at the forefront
            of the education industry in this region. Our approach is centered
            around incorporating the latest advancements in artificial
            intelligence technology to create assistive learning tools that can
            better cater to the needs of students.
            <br />
            By utilizing AI-powered tools, Lecture Mate aims to provide students
            with a more personalized and engaging learning experience that can
            help them achieve better academic results.
            <br />
            Furthermore, their commitment to innovation and continuous
            improvement has allowed them to develop cutting-edge solutions that
            can help revolutionize the way we approach education. Overall,
            Lecture Mate is a company that is making great strides in the field
            of education, and their work is sure to have a significant impact on
            the future of learning.
          </Text>
        </Flex>

        {/* LECTURE IS NOW YOUR MATE 😏🙄 */}
        <Flex color="white" mt={{ base: 20, lg: 60 }} direction="column" align="center">
          <Text
            id="faq"
            fontSize={{ base: "xl", md: "4xl", lg: "4xl" }}
            fontWeight={"extrabold"}
            w="35rem"
            textAlign="center"
          >
            What exactly can Lecture Mate do...
          </Text>
          <Text
            fontSize={13}
            fontWeight={"medium"}
            w={{ base: "20em", lg: "35rem"}}
            mt={2}
            textAlign="center"
          >
            Here's a list of things Lecture Mate said it could do when we asked
            it.🤞
          </Text>
          <Accordion allowToggle mt={10}  w={{ base: "20em", md: "30em", lg: "48rem"}}>
            <AccordionItem border="none" mb={2} >
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    _hover={{ textDecoration: "underline" }}
                    fontWeight={600}
                    
                  >
                    Provide real-time insights and suggestions from lecture
                    notes.
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontSize={14} fontWeight={400} color="whiteAlpha.700">
                Lecture Mate provides real-time insights and suggestions during
                lectures to help students gain further understanding of concepts
                presented. This occurs through the usage of Artificial
                Intelligence algorithms that analyze lecture content and provide
                useful feedback.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none" mb={2}>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    _hover={{ textDecoration: "underline" }}
                    fontWeight={600}
                  >
                    Generate summaries of lectures for review and reinforcement.
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontSize={14} fontWeight={400} color="whiteAlpha.700">
                The tool also generates summaries of lectures, allowing students
                to review key points and reinforce their understanding. This
                allows students to easily review further after lectures and
                makes the revision process more effective.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none" mb={2}>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    _hover={{ textDecoration: "underline" }}
                    fontWeight={600}
                  >
                    Facilitate interactive learning with questions and answers.
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontSize={14} fontWeight={400} color="whiteAlpha.700">
                Lecture Mate facilitates interactive learning by allowing
                students to ask questions and receive prompt answers. This
                enhances their comprehension and engagement with the material.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none" mb={2}>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    _hover={{ textDecoration: "underline" }}
                    fontWeight={600}
                  >
                    Enable effortless navigation between pdf note and chat with
                    an intuitive user interface.
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontSize={14} fontWeight={400} color="whiteAlpha.700">
                Lecture Mate also enables effortless navigation with an
                intuitive user interface. This promotes a smooth and efficient
                learning experience and enables quick access to various
                features.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none" mb={2}>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    _hover={{ textDecoration: "underline" }}
                    fontWeight={600}
                  >
                    Create a sense of community and collaboration by connecting
                    students.
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontSize={14} fontWeight={400} color="whiteAlpha.700">
                The tool creates a sense of community and collaboration amongst
                its users by connecting students with peers where they can
                exchange knowledge and insights.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Center>
      <Footer />
    </Suspense>
  );
}
