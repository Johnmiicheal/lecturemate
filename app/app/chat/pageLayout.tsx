"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
  IoRemoveCircleOutline,
  IoGlobeOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import FileUpload from "../../../src/components/App/FileUpload";
import styles from "../../../styles/Chat.module.css";
import { FaTelegramPlane } from "react-icons/fa";
import Loading from "../../loading";

interface RequestData {
  requestData: string;
}

interface ResponseData {
  responseData: string;
}
const Chat = ({ user2 }: any) => {
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
  const [constantinePdfList, setConstantinePdfList] = useState<any[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean | any>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(true);
  const [isPdfClicked, setIsPdfClicked] = useState<boolean>(true);
  const [newFile, setNewFile] = useState<boolean>(true);
  const [fileUpload, setFileUpload] = useState<boolean>(false);
  const fileName = localStorage.getItem("file");

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  if(!user2){
    router.push("/signin")
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [responses]);

  const handleStoreRequest = (values: any[]) => {
    const questions = values.filter(
      (element, index) => index % 2 == 0 || index === 0
    );
    console.log(questions);

    setRequests(questions);
  };

  const handleStoreResponse = (response: any[]) => {
    const assistantResponses = response.filter(
      (element, index) => index % 2 !== 0
    );
    console.log(assistantResponses);

    setResponses(assistantResponses);
  };

  // const handleStoreResponses = (response: any[], currentResponse: any[]) => {
  //   const assistantResponses = response.filter((element, index) => index % 2 !== 0 || index === response[response.length-2]);
  //   console.log(assistantResponses);

  //   setResponses(currentResponse)
  // };

  const extractQuestion = (content: any) => {
    const regexPattern1 = /Question:\/\/--([\s\S]*?)(?=(--\/\/))/;
    const matchResult1 = content.match(regexPattern1);
    const textBeforePattern1 = matchResult1 ? matchResult1[1].trim() : content;

    const regexPattern2 = /^(.*?)(?=--\/\/)/;
    const matchResult2 = textBeforePattern1.match(regexPattern2);
    const finalText = matchResult2
      ? matchResult2[1].trim()
      : textBeforePattern1;

    return finalText;
  };

  // Map requests to extract questions
  let requestsWithQuestions = requests.map((request) => {
    return { content: extractQuestion(request.content) };
  });

  const getChatHistory = async () => {
    const condition = { column_value: user2?.id }; // Replace with your own condition

    // function delay(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }

    // const data = await delay(5000).then(async () => {
    console.log(
      "This is the local file in the get chat history: " +
        localStorage.getItem("file")
    );

    try {
      const { data, error } = await supabase
        .from("chats")
        .select()
        .eq("user_id", condition.column_value)
        .eq("pdf_name", localStorage.getItem("file"));

      if (error) {
        console.log(error);
      } else {
        console.log("Get chat history success");

        return data[0].chats;
      }
    } catch (err) {
      console.log(err);
      return [];
    }
    // });

    // return data;
  };

  const onReload = async () => {
    const listOfPdfs = async () => {
      const condition = { column_value: user2?.id }; // Replace with your own condition
      const arr: any[] = []

      function delay(ms: number | undefined) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      try {
        const { data, error } = await supabase
          .from("booklist")
          .select("*")
          .eq("user_id", condition.column_value);

        if (error) {
          console.log(error);
        } else {
          data.map((element: any) => arr.push(element));
          return arr;
        }
      } catch (error) {
        console.log("There was an error fetching the pdfs: " + error);
      }
    };

    const pdfList: any = await listOfPdfs();

    const uniqueArrayPdfList = pdfList.filter(
      (value: any, index: any, self: any) => self.indexOf(value) === index
    );
    console.log(uniqueArrayPdfList);
    setPdfList(uniqueArrayPdfList);
  };

  const realtimeReload = () => {
    onReload();

    const channel = supabase
      .channel("pdfList-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "booklist",
          filter: `user_id=eq.${user2?.id}`
        },
        (payload) => {
          console.log("This is the payload: " + JSON.stringify(payload));
          if (Object.keys(payload.new).length !== 0) {
            onReload();
            // setPdfList(
            //   (prevPdfList) => [...prevPdfList, payload.new] as any[]
            // );
          }
          console.log(
            "These are the schedules why: " + JSON.stringify(pdfList, null, 2)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  useEffect(() => {
    realtimeReload();
  }, [supabase, isUploaded, newFile]);

  useEffect(() => {
    const onReload = async () => {
      console.log("Newfile set");

      if (
        !localStorage.getItem("file") ||
        localStorage.getItem("file") === undefined ||
        localStorage.getItem("file") === null ||
        localStorage.getItem("file") === "global" 
        // ||
        // pdfList.every((pdf) => pdf.book_name !== localStorage.getItem("file"))
      ) {
        console.log("There was no local storage file");
        localStorage.setItem("file", "global");
        setSelectedPdf("none");
      } else {
        setSelectedPdf(localStorage.getItem("file"));
      }

      const history = await getChatHistory();
      handleStoreRequest(history);
      handleStoreResponse(history);
    };

    onReload();
  }, [newFile]);

  // useEffect(() => {
  //   // Fetch scheduler data from Supabase
  //   // if(shouldRunEffect) {
  //   const fetchSchedulers = async () => {
  //     const { data, error } = await supabase
  //       .from("schedulers")
  //       .select("*")
  //       .eq("user_id", userId);
  //     if (error) {
  //       console.error("Error fetching schedulers:", error.message);
  //     } else {
  //       setSchedulers(data);
  //       console.log(
  //         "These are the schedules why: " + JSON.stringify(schedulers, null, 2)
  //       );
  //     }
  //   };

  //   fetchSchedulers();

  //   const channel = supabase
  //     .channel("schedulers-realtime")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "*",
  //         schema: "public",
  //         table: "schedulers",
  //         filter: `user_id=eq.${userId}`
  //       },
  //       (payload) => {
  //         console.log("This is the payload: " + JSON.stringify(payload));
  //         if(Object.keys(payload.new).length !== 0){
  //         setSchedulers(
  //           (prevSchedulers) => [...prevSchedulers, payload.new] as Scheduler[]
  //         );
  //       }
  //         console.log(
  //           "These are the schedules why: " +
  //             JSON.stringify(schedulers, null, 2)
  //         );
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // // }
  // }, [supabase, shouldRunEffect]);

  const constantineOnReload = async () => {
    const constantinePdfs = async () => {
      const condition = { column_value: "constantine" }; // Replace with your own condition
      const arr: any[] = [];

      // function delay(ms: number | undefined) {
      //   return new Promise(resolve => setTimeout(resolve, ms));
      // }

      try {
        const { data, error } = await supabase
          .from("booklist")
          .select("*")
          .eq("user_id", condition.column_value);

        if (error) {
          console.log(error);
        } else {
          data.map((element: any) => arr.push(element));
          return arr;
        }
      } catch (error) {
        console.log("There was an error fetching the pdfs: " + error);
      }
    };

    const constantinePdfList: any = await constantinePdfs();

    const constantineUniqueArrayPdfList = constantinePdfList.filter(
      (value: any, index: any, self: any) => self.indexOf(value) === index
    );
    console.log(constantineUniqueArrayPdfList);
    setConstantinePdfList(constantineUniqueArrayPdfList);
  };

  useEffect(() => {
    constantineOnReload();
  }, []);

  const handleClick = () => {
    setShowInput(!showInput);
  };

  // Add this function to set the selected PDF when a Flex is clicked
  const handlePdfClick = (pdf: string) => {
    // if(isPdfClicked){
    console.log("Pdf was clicked");
    localStorage.setItem("file", pdf);
    setSelectedPdf(pdf);
    setNewFile(!newFile);
    // }
  };

  const handleRetry = async () => {
    try {
      setIsLoading(true);
      const history = await getChatHistory();
      const fileName = localStorage.getItem("file");

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
        }
      );

      const data = await retryResponse.json();
      const retryAnswers = data.query;
      console.log(JSON.stringify(retryAnswers));
      console.log(retryAnswers);
      console.log(data.completion);
      // setTokenKey(values.token);
      if (retryResponse.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${retryResponse.status}`)
        );
      }
      handleStoreRequest(history);
      handleStoreResponse(history);

      setNewFile(!newFile);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
  };

  const handleClearChats = async (pdfName: any) => {
      try {       
        // Delete the scheduler from Supabase
        const { data, error } = await supabase
          .from("chats")
          .delete()
          .eq("user_id", user2?.id)
          .eq("pdf_name", pdfName);

      if (error) {
        console.error("Error deleting scheduler:", error.message);
        return;
      }

      if (pdfName === localStorage.getItem("file")) {
        requestsWithQuestions = [];
        handleStoreRequest([]);
        handleStoreResponse([]);
      }

      toast({
        title: "Chat Cleared",
        position: "top-right",
        description: "You have cleared the chat",
        status: "success",
        variant: "left-accent",
        duration: 5000,
        isClosable: true,
      });

      // Call the onDelete callback to update the local state
    } catch (error) {
      console.error("Error handling scheduler deletion:", error);
    }
  };

  const handleRemovePdf = async (pdfId: any, pdfName: any, pdfListId: any) => {
    // setIsPdfClicked(false)
    try {
      const { data, error } = await supabase
    .from('booklist')
    .delete()
    .eq("user_id", user2?.id)
    .eq('id', pdfId)

    if(!error){
      try {
        const { data, error } = await supabase
      .from('pdfs')
      .delete()
      .eq("user_id", user2?.id)
      .eq('pdf_name', pdfName)

      if(error) {
        console.log("Error deleting pdf " + error)
      }else {
        await handleClearChats(pdfName)
        const updatedArrayPdfList = pdfList.filter(
          (pdfs, index) => index !== pdfListId
        );
        setPdfList(updatedArrayPdfList)
        if(localStorage.getItem("file") === pdfName) {
          localStorage.removeItem("file");
          setNewFile(!newFile)
        }
        // setIsPdfClicked(true)
      }
      } catch (error) {
        console.log(error)
      }

    }else {
      console.log("Error deleting pdf name " + error)
    }
    } catch (error) {
      console.log(error);
    }
  };

  const onGlobal = () => {
    localStorage.setItem("file", "global");
    setSelectedPdf("none");
    setNewFile(!newFile);
  };

  const onFileUpload = async () => {
    const fileName = localStorage.getItem("file");

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
          query: "Give a summary of the resource provided",
          userId: user2?.id,
          nameOfFile: fileName,
          retryQuery: undefined,
        }),
      }
    );
    const data = await response.json();
    const history = data.query;
    console.log(JSON.stringify(history));
    console.log(history);
    console.log(data.completion);
    // setTokenKey(values.token);
    if (response.status !== 200) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      );
    }
    handleStoreRequest(history);
    handleStoreResponse(history);
  };

  useEffect(() => {
    if (fileUpload) {
      onFileUpload();
    }
    setFileUpload(false)
  }, [fileUpload]);

  // const sponsors = [
  //   // { name: "Sky Waiters", img: "/skywaiter.png", role: "Investor", link: "#" },
  // ];
  const toast = useToast();

  let username:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;

  if (user2) {
    username = user2.user_metadata.username;
  }

  // useEffect(() => {
  //   const eventSource = new EventSource("https://crazy-rose-leg-warmers.cyclic.app/api/api")

  //   eventSource.onmessage = (event) => {
  //     const responseData = JSON.parse(event.data).response
  //     console.log('These are the chunks: ' + responseData)
  //     handleStoreResponses(responseData)
  //   }

  //   eventSource.onerror = (error) => {
  //     console.error('Error: ' + error)
  //   }
  // }, [])

  return (
    <Suspense fallback={<Loading />}>
      <Flex bg="#F8FCF7">
        <Flex w="full" direction="column" justify="space-between">
          <Layout
            user3={user2}
            handleClearChats={handleClearChats}
            selectedPdf={selectedPdf}
            onGlobal={onGlobal}
            handlePdfClick={handlePdfClick}
            onReload={onReload}
            pdfList={pdfList}
            handleRemovePdf={handleRemovePdf}
            constantinePdfList={constantinePdfList}
            constantineOnReload={constantineOnReload}
            isUploaded={isUploaded}
            setIsUploaded={setIsUploaded}
            newFile={newFile}
            setNewFile={setNewFile}
            setSelectedPdf={setSelectedPdf}
            fileUpload={fileUpload}
            setFileUpload={setFileUpload}
          />
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
              overflow={"scroll"}
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
                w="full"
                h="20px"
                mt={5}
                mb={13}
                align="center"
                justify="start"
                bg={"none" === selectedPdf ? "#53AF28" : ""}
                color={"none" === selectedPdf ? "white" : "#53AF28"}
                border="1px solid #53AF28"
                _hover={
                  "none" === selectedPdf
                    ? { color: "white", bg: "#53AF28" }
                    : { color: "#005103", bg: "#90E768" }
                }
                _active={{ color: "white", bg: "#53AF28" }}
                py={5}
                pl={3}
                borderRadius="md"
                cursor="pointer"
                onClick={onGlobal}
              >
                <Icon as={IoGlobeOutline} w="5" h="5" mr={"1"} />
                Global
              </Flex>

              {pdfList.map((pdf, index) => (
                <Flex
                  key={index}
                  position={"relative"}
                  h="50px"
                  mt={5}
                  gap={2}
                  justify="start"
                  align="center"
                  // Change the background color based on selectedPdf
                  bg={pdf.book_name === selectedPdf ? "#53AF28" : ""}
                  color={pdf.book_name === selectedPdf ? "white" : "#53AF28"}
                  w="full"
                  border={"1px solid #53AF28"}
                  _hover={
                    pdf.book_name === selectedPdf
                      ? { color: "white", bg: "#53AF28" }
                      : { color: "#005103", bg: "#90E768" }
                  }
                  _active={{ color: "white", bg: "#53AF28" }}
                  pl={3}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handlePdfClick(pdf.book_name)}
                >
                  <Icon as={IoChatbubbleEllipsesOutline} w="5" h="5" />
                  <Text
                    noOfLines={1}
                    w="70%"
                    textOverflow="ellipsis"
                    key={index}
                  >
                    {pdf.book_name}
                  </Text>
                  <Icon
                    as={IoRemoveCircleOutline}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePdf(pdf.id, pdf.book_name, index);
                    }}
                    position={"absolute"}
                    zIndex={"20"}
                    top={"50%"}
                    right={3}
                    transform={"translateY(-50%)"}
                    _hover={
                      pdf.book_name === selectedPdf
                        ? {
                            color: "white",
                            bg: "#3C7C1C",
                            borderRadius: "100%",
                          }
                        : {
                            color: "white",
                            bg: "#53AF28",
                            borderRadius: "100%",
                          }
                    }
                    w="5"
                    h="5"
                  />
                </Flex>
              ))}

              {constantinePdfList.map((pdf, index) => (
                <Flex
                  key={index}
                  h="50px"
                  mt={5}
                  gap={2}
                  justify="start"
                  align="center"
                  // Change the background color based on selectedPdf
                  bg={pdf.book_name === selectedPdf ? "#53AF28" : ""}
                  color={pdf.book_name === selectedPdf ? "white" : "#53AF28"}
                  w="full"
                  border={"1px solid #53AF28"}
                  _hover={
                    pdf.book_name === selectedPdf
                      ? { color: "white", bg: "#53AF28" }
                      : { color: "#005103", bg: "#90E768" }
                  }
                  _active={{ color: "white", bg: "#53AF28" }}
                  pl={3}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handlePdfClick(pdf.book_name)}
                >
                  <Icon as={IoChatbubbleEllipsesOutline} w="5" h="5" />
                  <Text noOfLines={1} textOverflow="ellipsis" key={index}>
                    {pdf.book_name}
                  </Text>
                </Flex>
              ))}

              {/* <Flex
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
              </Flex> */}
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
                    Don't forget to <strong>copy your token</strong> after
                    uploading your note😊
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
                  {requestsWithQuestions.map((request, index) => (
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
                          <div key={index} dangerouslySetInnerHTML={{ __html: request.content.replace(/\\n|\n/g, '<br>') }} />
                          {/* <Text key={index}>{request.content}</Text> */}
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

                      {index >= responses.length ? (
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
                          <Flex
                            direction="column"
                            justify="center"
                            textAlign={"center"}
                          >
                            <Text>
                              There was an error processing your request please
                              try again
                            </Text>
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
                      ) : (
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
                            {/* <Text key={index}>{responses[index].content}</Text> */}
                            <div dangerouslySetInnerHTML={{ __html: responses[index].content.replace(/\\n|\n/g, '<br>')}} />
                           <Text fontSize={11} mt={3} fontWeight="bold">
                              Lecture Mate
                            </Text>
                          </Flex>
                        </Box>
                      )}
                    </Flex>
                  ))}
                </Flex>
              </Flex>

              {requests.length === responses.length && (
                <Flex
                  pos="fixed"
                  bottom="0"
                  bg="#F8FCF7"
                  px={{ base: "2", lg: "60" }}
                  pb="10"
                >
                  <Formik
                    initialValues={{ query: "" }}
                    onSubmit={async (values, actions) => {
                      if (values) {
                        try {
                          const fileName = localStorage.getItem("file");

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
                          const history = data.query;
                          console.log(JSON.stringify(history));
                          console.log(history);
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
                                  w={{
                                    base: "300px",
                                    md: "500px",
                                    lg: "720px",
                                  }}
                                  borderRadius="md"
                                  placeholder="What would you like to ask?"
                                  focusBorderColor="#005103"
                                  style={{
                                    // height: textareaHeight,
                                    // textAlign: 'center', // Align text vertically in the center
                                    lineHeight: "2.5", // Set line height to control the vertical centering
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
                                        (
                                          e.target as HTMLTextAreaElement
                                        ).value = newValue;
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
                </Flex>
              )}
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
            <FileUpload
              user3={user2}
              isUploaded={isUploaded}
              setIsUploaded={setIsUploaded}
              newFile={newFile}
              setNewFile={setNewFile}
              setSelectedPdf={setSelectedPdf}
              fileUpload={fileUpload}
              setFileUpload={setFileUpload}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Suspense>
  );
};

export default Chat;
