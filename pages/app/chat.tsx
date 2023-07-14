import {
  Text,
  Flex,
  useDisclosure,
  useToast,
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  IconButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Divider,
  Box,
} from "@chakra-ui/react";
import React, { useState, useEffect, ReactNode, useRef } from "react";
import axios from "axios";
import Layout from "../../src/components/App/Layout";
import { IoAdd, IoPaperPlaneOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import FileUpload from "../../src/components/App/FileUpload";

interface RequestData {
    requestData: string;
  }
  
  interface ResponseData {
    responseData: string;
  }
const Chat = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showInput, setShowInput] = useState(false);
  const [showChat, setShowChat] = useState(false);
//   const [query, setQuery] = useState("");
//   const [result, setResult] = useState("");
  const [tokenKey, setTokenKey] = useState("");
  const [requests, setRequests] = useState<String[]>([]);
  const [responses, setResponses] = useState<ReactNode[]>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [responses]);

  useEffect(() => {
    // Load stored requests and responses from localStorage
    const storedRequests = localStorage.getItem("requests");
    const storedResponses = localStorage.getItem("responses");

    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }

    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, []);

  const handleStoreRequest = (values: string) => {
    setRequests((prevRequests) => [...prevRequests, values]);
    localStorage.setItem(
      "requests",
      JSON.stringify([...requests, values])
    );
  };

  const handleStoreResponse = (response: ReactNode) => {
    setResponses((prevResponses) => [...prevResponses, response]);
    localStorage.setItem(
      "responses",
      JSON.stringify([...responses, response])
    );
  };

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const sponsors = [
    { name: "Sky Waiters", img: "/skywaiter.png", role: "Investor", link: "#" },
  ];
  const toast = useToast();
  return (
    <>
      <Flex bg="#F8FCF7">
        <Flex w="full" direction="column" justify="space-between">
          <Layout />
          <Flex direction="column" w="full" align="center">
            <Flex
              direction="column"
              h="100vh"
              w="300px"
              bg="white"
              ml="130px"
              mr="auto"
              px={5}
              justify="space-between"
              display={{ base: "none", lg: "block" }}
            >
              <Flex
                w="full"
                h="20px"
                mt={20}
                align="center"
                justify="start"
                color="#53AF28"
                border="1px solid #53AF28"
                _hover={{ bg: "#53AF28", color: "white" }}
                py={5}
                pl={3}
                borderRadius="md"
                cursor="pointer"
                onClick={onOpen}
              >
                <Icon as={IoAdd} w="5" h="5" />
                Upload Note
              </Flex>

              <Flex
                direction="column"
                justify="center"
                mb={10}
                bottom={10}
                pos="fixed"
              >
                <Divider w="260px" />
                <Text color="#808680">Sponsored by</Text>
                {sponsors.map((p, i) => (
                  <Flex align="center" key={i} gap={2} mt={5}>
                    <Image
                      src={p.img}
                      alt={p.name}
                      w="50px"
                      borderRadius="md"
                    />
                    <Box gap={1}>
                      <Text fontWeight={600}>{p.name}</Text>
                      <Text>{p.role}</Text>
                    </Box>
                  </Flex>
                ))}
              </Flex>
            </Flex>

            <Flex
              direction="column"
              align="center"
              ml={{ base: "130px", lg: "320px" }}
            >
              <Flex direction="column" gap="20" top={20} pos="fixed">
                  <Flex
                    direction="column"
                    w="700px"
                    maxH="700px"
                    overflowY="scroll"
                    mb={3}
                    boxSizing="content-box"
                    ref={chatContainerRef}
                    css={{
                        "&:: -webkit-scrollbar": {
                            display: "none",
                        },
                        "&:: -ms-overflow-style": "none",
                        "&:: scrollbar-width": "none",
                    }}
                  >  {requests.map((request, index) => (
                    <Flex direction="column" key={index}>
                    <Box
                      bg="green.100"
                      minW="150px"
                      maxW="450px"
                      maxH="full"
                      py={2}
                      px={4}
                      borderRadius="20px 20px 0 20px "
                      ml="auto"
                      mb={2}
                    >
                      <Flex direction="column" justify="space-between">
                        {/* <Text>{query}</Text> */}
                      <Text key={index}>{request}</Text>
                        <Text fontSize={11} mt={3} ml='auto' fontWeight="bold">
                          Me
                        </Text>
                      </Flex>
                    </Box>
                      
                    <Box
                      bg="white"
                      minW="150px"
                      h="full"
                      maxW="450px"
                      py={2}
                      px={4}
                      mr="auto"
                      mb={2}
                      borderRadius="20px 20px 20px 0 "
                      display={ responses.length <= 0 ? 'none' : 'block' }
                    >
                        <Flex direction="column" justify="space-between">
                            <Text key={index}>{(responses[index])}</Text>
                            <Text fontSize={11} mt={3} fontWeight="bold">Lecture Mate</Text>
                        </Flex>
                      {/* <Text> {result} </Text> */}
                    </Box>
                    </Flex>
                  ))}
                  </Flex>
              </Flex>
              <Flex pos="fixed" bottom="10">
                <Formik
                  initialValues={{ query: "", token: tokenKey }}
                  onSubmit={async (values, actions) => {
                    if (values) {
                      try {
                        // const response = await fetch("/api/api", {
                        //   method: "POST",
                        //   headers: {
                        //     "Content-Type": "application/json",
                        //   },
                        //   body: JSON.stringify(values),
                        // });
                        const response = await axios.post('/api/api', values)
                        handleStoreRequest(values.query);
                        const data = await response.data;
                        setTokenKey(values.token);
                        if (response.status !== 200) {
                          throw (
                            data.error ||
                            new Error(
                              `Request failed with status ${response.status}`
                            )
                          );
                        }
                        handleStoreResponse(data.result);
                      } catch (error) {
                        console.error("Chat error:", error);
                        toast({
                          title: "Server Error",
                          position: "top-right",
                          description: "We were unable to complete your request",
                          status: "error",
                          variant: "left-accent",
                          duration: 5000,
                          isClosable: true,
                        });
                      }
                    }
                    setTimeout(() => {
                        setShowChat(true);
                        actions.resetForm({
                            values: {
                                ...values,
                                query: "",
                            },
                        });
                        actions.setSubmitting(false);
                    }, 300);
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name="query">
                        {({ field, form }: any) => (
                          <FormControl>
                            <InputGroup>
                              <Input
                                bg="#E2F0E2"
                                {...field}
                                h="60px"
                                w={{ base: "300px", md: "600px", lg: "800px" }}
                                borderRadius="md"
                                placeholder="What would you like to ask?"
                                focusBorderColor="#005103"
                              />
                              <InputRightElement>
                                <IconButton
                                  icon={<IoPaperPlaneOutline />}
                                  variant="ghost"
                                  aria-label="send message"
                                  w="6"
                                  h="6"
                                  mt={5}
                                  mr={7}
                                  type="submit"
                                  isLoading={props.isSubmitting}
                                  color="#808680"
                                />
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      <Flex>
                        <Button onClick={handleClick} mt={2} mr={2}>
                          {showInput ? "Hide Token" : "Show Token"}
                        </Button>
                        <Field name="token">
                          {({ field, form }: any) => (
                            <FormControl>
                              {showInput && (
                                <Input
                                  mt={2}
                                  {...field}
                                  focusBorderColor="#005103"
                                  placeholder="Input Token here"
                                />
                              )}
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                    </Form>
                  )}
                </Formik>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Modal
        isCentered
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", lg: "lg" }}
      >
        <ModalOverlay />
        <ModalContent
          minW={{ base: "10rem", lg: "33rem" }}
          minH="20rem"
          borderColor="white"
          borderRadius="10px"
        >
          <ModalHeader
            borderRadius="10px 10px 0 0 "
            bgGradient="linear(to-l, #00F0FF, #53AF28)"
            color="white"
          >
            Lecture Mate - Upload File
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={7}>
            <FileUpload />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Chat;
