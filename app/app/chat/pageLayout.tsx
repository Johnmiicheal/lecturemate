'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  Box,
  Textarea,
} from "@chakra-ui/react";
import React, { useState, useEffect, ReactNode, useRef, Suspense } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Layout from "../../../src/components/App/Layout";
import {
  IoAdd,
  IoPaperPlaneOutline,
  IoChatbubbleEllipsesOutline,
  IoChevronForward,
  IoPaperPlane,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import FileUpload from "../../../src/components/App/FileUpload";
import styles from "../../../styles/Chat.module.css";
import { FaTelegramPlane } from "react-icons/fa";
import Loading from '../../loading';

interface RequestData {
  requestData: string;
}

interface ResponseData {
  responseData: string;
}
const Chat = ({user2}: any) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showInput, setShowInput] = useState(false);
  const [showChat, setShowChat] = useState(false);
  //   const [query, setQuery] = useState("");
  //   const [result, setResult] = useState("");
  // const [tokenKey, setTokenKey] = useState("");
  const [requests, setRequests] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [pdfList, setPdfList] = useState<any[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | any>(false) 
  const fileName = localStorage.getItem("file");

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
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

  const handleStoreRequest = (values: any[]) => {
    const questions = values.filter((element, index) => index % 2 == 0 || index === 0);
    console.log(questions);

    setRequests(questions)
    
    // setRequests((prevRequests) => [...prevRequests, values]);
    // localStorage.setItem("requests", JSON.stringify([...requests, values]));
  };

  const handleStoreResponse = (response: any[]) => {
    const assistantResponses = response.filter((element, index) => index % 2 !== 0);
    console.log(assistantResponses);

    setResponses(assistantResponses)
    // setResponses((prevResponses) => [...prevResponses, response]);
    // localStorage.setItem("responses", JSON.stringify([...responses, response]));
  };

  const getChatHistory = async () => {
    const condition = { column_value: user2.id }; // Replace with your own condition

    function delay(ms: number | undefined) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const data = await delay(5000).then(async () => {
      const { data, error } = await supabase
        .from('chats')
        .select()
        .eq('user_id', condition.column_value);
  
      if (error) {
        console.log(error);
      } else {
        console.log("This is the get chat history: " + JSON.stringify(data[0].chats));
        return data[0].chats;
      }
    });
  
    return data;
  }

  useEffect(() => {
    const onReload = async () => {  
      const history = await getChatHistory()
      handleStoreRequest(history)
      handleStoreResponse(history) 
    }

    onReload()
    
  }, [])

  useEffect(() => {
    const onReload = async () => {
      const listOfPdfs = async () => {
        const condition = { column_value: user2.id }; // Replace with your own condition
        const arr: any[] = []

        function delay(ms: number | undefined) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
  
        const data: any[] | any = await delay(5000).then(async () => {
          const { data, error } = await supabase
            .from('booklist')
            .select('*')
            .eq('user_id', condition.column_value);
      
          if (error) {
            console.log(error);
          } else {
            console.log("This is the list of books: " + JSON.stringify(data));
            return data;
          }
        });
    
        console.log(data)
        data.map((element: any) => (
          arr.push(element.book_name)
        ))
        return arr;
      }
  
      const pdfList: any = await listOfPdfs()

      const uniqueArrayPdfList = pdfList.filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index
      );
      console.log(uniqueArrayPdfList);
      setPdfList(uniqueArrayPdfList)
    }

    onReload()
    
  }, [])

  const handleClick = () => {
    setShowInput(!showInput);
  };

  // Add this function to set the selected PDF when a Flex is clicked
  const handlePdfClick = (pdf: string) => {
    localStorage.setItem("file", pdf)
    setSelectedPdf(pdf);
  }; 

  const handleRetry = async () => {
    try{
    setIsLoading(true)
    const history = await getChatHistory()
    const fileName = localStorage.getItem("file")

    const retryResponse = await fetch(
      "https://crazy-rose-leg-warmers.cyclic.app/api/api",
    // "https://purple-chipmunk-tam.cyclic.app/api/api/",
     // "http://localhost:3000/api",
     {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      retryQuery: history,
      userId: user2?.id,
      nameOfFile: fileName,
      query: undefined,
      }),
      });

      const data = await retryResponse.json();
          const retryAnswers = data.query
          console.log(JSON.stringify(retryAnswers))
          console.log(retryAnswers)
          console.log(data.completion);
          // setTokenKey(values.token);
          if (retryResponse.status !== 200) {
            throw (
              data.error ||
              new Error(
                `Request failed with status ${retryResponse.status}`
              )
            );
          }
          handleStoreRequest(history);
          handleStoreResponse(history);
          router.push('https://lecturemate.org/app/chat') 
        setIsLoading(false)
      }catch(error) {
        setIsLoading(false)
        router.push('https://lecturemate.org/app/chat')
        console.error("Chat error:", error);
        toast({
          title: "Server Error",
          position: "top-right",
          description:
            "We were unable to complete your request",
          status: "error",
          variant: "left-accent",
          duration: 5000,
          isClosable: true,
        });        
      }   
  }

  const sponsors = [
    { name: "Sky Waiters", img: "/skywaiter.png", role: "Investor", link: "#" },
  ];
  const toast = useToast();

    let username: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined;
  
    if(user2){
      username = user2.user_metadata.username;
    }

  return (
    <Suspense fallback={<Loading />}>
      <Flex bg="#F8FCF7">
        <Flex w="full" direction="column" justify="space-between">
          <Layout user3 = {user2}/>
          <Flex
            direction="column"
            w="full"
            align={{ base: "center", lg: "start" }}
          >
            <Flex
              direction="column"
              h="100vh"
              w="17em"
              bg="white"
              ml="130px"
              px={5}
              zIndex={2}
              display={{ base: "none", lg: "flex" }}
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

              {pdfList.map((pdf, index)=> (
                <Flex
                key={index}
                h="50px"
                mt={5}
                gap={2}
                justify="start"
                align="center"
                // Change the background color based on selectedPdf
                bg={pdf === selectedPdf ? "#53AF28" : ""}
                color={pdf === selectedPdf ? "white" : "#53AF28"}
                w="full"
                border={"1px solid #53AF28"}
                _hover={pdf === selectedPdf ? {color: "white", bg: "#53AF28"} : { color: "#005103", bg: "#90E768" }}
                _active={{ color: "white", bg: "#53AF28" }}
                pl={3}
                borderRadius="md"
                cursor="pointer"
                onClick={() => handlePdfClick(pdf)}
              >
                <Icon as={IoChatbubbleEllipsesOutline} w="5" h="5" />
                <Text noOfLines={1} textOverflow="ellipsis" key={index}>
                  {pdf}
                </Text>
              </Flex>
              ))
                
              }

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

            {requests.length <= 0 && (
              <Flex
                direction="column"
                align="center"
                ml={{ base: "0", lg: "60%" }}
              >
                <Flex
                  direction="column"
                  align="center"
                  textAlign="center"
                  gap="5"
                  pos="fixed"
                  top={20}
                  px={{ base: 2, md: 0 }}
                >
                  <Player
                    autoplay
                    loop
                    src="/dancingbook.json"
                    className={styles.lottie}
                  />
                  <Text>
                    Upload a note to get started or just ask any question <br />
                    Don't forget to <strong>copy your token</strong> after uploading your note😊
                  </Text>
                  <Flex
                    w="full"
                    h="20px"
                    mt={2}
                    align="center"
                    justify="center"
                    bg="#53AF28"
                    color="white"
                    border="1px solid #53AF28"
                    _hover={{ color: "#005103", bg: "#90E768" }}
                    py={5}
                    pl={3}
                    borderRadius="md"
                    cursor="pointer"
                    onClick={onOpen}
                  >
                    <Icon as={IoAdd} w="5" h="5" />
                    Upload Note
                  </Flex>
                </Flex>
              </Flex>
            )}

            <Flex
              direction="column"
              align="center"
              ml={{ base: "0", lg: "200px" }}
              w="full"
            >
              <Flex direction="column" gap="20" pos="fixed" top={20}>
                <Flex
                  direction="column"
                  w={{ lg: "700px" }}
                  pr={{ lg: 10 }}
                  px={{ base: 4 }}
                  maxH="68vh"
                  overflowY="scroll"
                  mb={7}
                  boxSizing="content-box"
                  ref={chatContainerRef}
                  css={{
                    "&:: -webkit-scrollbar": {
                      display: "none",
                    },
                    "&:: -ms-overflow-style": "none",
                    "&:: scrollbar-width": "none",
                  }}
                >
                  {" "}
                  
                  {
                  requests.map((request, index) => (
                    <Flex direction="column" key={index}>
                      <Box
                        bg="green.100"
                        minW="100px"
                        maxW="450px"
                        maxH="full"
                        py={2}
                        px={4}
                        borderRadius="30px 30px 0 30px "
                        ml="auto"
                        mb={2}
                      >
                        <Flex direction="column" justify="space-between">
                          {/* <Text>{query}</Text> */}
                          <Text key={index}>{request.content}</Text>
                          <Text
                            fontSize={11}
                            mt={2}
                            ml="auto"
                            fontWeight="bold"
                            fontStyle="italic"
                          >
                            {username}
                          </Text>
                        </Flex>
                      </Box>

                      {index >= responses.length ? 
                      <Box
                      bg="white"
                      h="full"
                      w={"100%"}
                      mt={20}
                      py={2}
                      px={4}
                      mb={5}
                      borderRadius={8}
                      border="2px solid"
                      borderColor="gray.100"
                      display={responses.length <= 0 ? "none" : "block"}
                      >
                        <Flex direction="column" justify="center" textAlign={"center"}>                          
                        <Text>There was an error processing your request please try again</Text>
                          <Button
                            type="submit"
                            mt={4}
                            // onClick={handleFormSubmit}
                            onClick={handleRetry}
                            color="#53AF28"
                            border="1px solid #53AF28"
                            _hover={{ bg: "#53AF28", color: "white" }}
                            variant="outline"                          
                            isLoading={isLoading}
                          >
                            Retry
                          </Button>                            
                        </Flex>
                    </Box>
                      :
                      <Box
                        bg="white"
                        minW="150px"
                        h="full"
                        maxW="450px"
                        py={2}
                        px={4}
                        mr="auto"
                        mb={5}
                        borderRadius="30px 30px 30px 0 "
                        border="2px solid"
                        borderColor="gray.100"
                        display={responses.length <= 0 ? "none" : "block"}
                      >
                          <Flex direction="column" justify="space-between">
                            <Text key={index}>{responses[index].content}</Text>
                            <Text fontSize={11} mt={3} fontWeight="bold">
                              Lecture Mate
                            </Text>                            
                          </Flex>
                      </Box>}
                    </Flex>
                  ))}                              
                </Flex>
              </Flex>

              {requests.length === responses.length && (<Flex
                pos="fixed"
                bottom="0"
                bg="#F8FCF7"
                px={{ base: "2", lg: "60" }}
                pb="10"
              >
                <Formik
                  initialValues={{ query: ""}}
                  onSubmit={async (values, actions) => {
                    if (values) {
                      try {
                        const fileName = localStorage.getItem("file")

                        const response = await fetch(
                          "https://crazy-rose-leg-warmers.cyclic.app/api/api",
                          // "https://purple-chipmunk-tam.cyclic.app/api/api/",
                          // "http://localhost:3000/api",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              query: values.query,
                              userId: user2?.id,
                              nameOfFile: fileName,
                              retryQuery: undefined,
                            }),
                          }
                        );
                        const data = await response.json();
                        const history = data.query
                        console.log(JSON.stringify(history))
                        console.log(history)
                        console.log(data.completion);
                        // setTokenKey(values.token);
                        if (response.status !== 200) {
                          throw (
                            data.error ||
                            new Error(
                              `Request failed with status ${response.status}`
                            )
                          );
                        }
                        handleStoreRequest(history);
                        handleStoreResponse(history);
                      } catch (error) {
                        console.error("Chat error:", error);
                        toast({
                          title: "Server Error",
                          position: "top-right",
                          description:
                            "We were unable to complete your request",
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
                              <Textarea
                                resize="none"
                                bg="#E2F0E2"
                                {...field}
                                minH="60px"
                                maxH="200px"
                                justifyItems="center"
                                pr="10"
                                css={{
                                  "&:: -webkit-scrollbar": {
                                    display: "none",
                                  },
                                  "&:: -ms-overflow-style": "none",
                                  "&:: scrollbar-width": "none",
                                }}
                                w={{ base: "300px", md: "500px", lg: "720px" }}
                                borderRadius="md"
                                placeholder="What would you like to ask?"
                                focusBorderColor="#005103"
                                style={{
                                  // height: textareaHeight,
                                  // textAlign: 'center', // Align text vertically in the center
                                  lineHeight: '2.5', // Set line height to control the vertical centering
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    if (!e.shiftKey) {
                                        e.preventDefault(); // Prevent the default behavior of Enter key (submit the form)
                                        if (field.value.trim().length > 0) {
                                          props.submitForm(); // Submit the form when Enter is pressed (without Shift key) and the field is not empty
                                        }
                                    } else {
                                      // Add a new line by inserting a newline character
                                      const currentValue = (
                                        e.target as HTMLTextAreaElement
                                      ).value;
                                      const selectionStart = (
                                        e.target as HTMLTextAreaElement
                                      ).selectionStart;
                                      const newValue =
                                        currentValue.substring(
                                          0,
                                          selectionStart
                                        ) +
                                        "\n" +
                                        currentValue.substring(
                                          (e.target as HTMLTextAreaElement)
                                            .selectionEnd
                                        );
                                      (e.target as HTMLTextAreaElement).value =
                                        newValue;
                                      // Trigger onChange event manually to update Formik state
                                      (
                                        e.target as HTMLTextAreaElement
                                      ).dispatchEvent(
                                        new Event("input", { bubbles: true })
                                      );
                                      e.preventDefault(); // Prevent the default behavior of Enter key (new line)
                                    }
                                  }
                                }}
                              />
                              <InputRightElement>
                                <IconButton
                                  icon={<IoPaperPlane />}
                                  variant="solid"
                                  bg={"#53AF28"}
                                  color="#F8FCF7"
                                  _hover={{ bg: "#005103", color: "white" }}
                                  py={4}
                                  aria-label="send message"
                                  w="6"
                                  h="6"
                                  mt={5}
                                  mr={7}
                                  type="submit"
                                  isDisabled={
                                    !props.isValid || !props.dirty
                                      ? true
                                      : false
                                  }
                                  isLoading={props.isSubmitting}
                                />
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      {/* <Flex w="full">
                        <Button
                          onClick={handleClick}
                          mt={2}
                          mr={2}
                          color="#53AF28"
                          bg="#F8FCF7"
                          fontWeight={500}
                          border="1px solid #53AF28"
                          _hover={{ bg: "#53AF28", color: "white" }}
                        >
                          {showInput ? "Hide Token" : "Add Token"}
                        </Button>
                        <Field name="token">
                          {({ field, form }: any) => (
                            <FormControl>
                              {showInput && (
                                <Input
                                  mt={2}
                                  px={2}
                                  {...field}
                                  focusBorderColor="#005103"
                                  placeholder="Input Token here"
                                />
                              )}
                            </FormControl>
                          )}
                        </Field>
                      </Flex> */}
                    </Form>
                  )}
                </Formik>
              </Flex>)}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Modal
        isCentered
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
        // size={{ base: "sm", md: "md", lg: "lg" }}
      >
        <ModalOverlay />
        <ModalContent
          minW={{ base: "12rem", md: "24rem", lg: "33rem" }}
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
            <FileUpload user3 = {user2} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Suspense>
  );
};

export default Chat;
