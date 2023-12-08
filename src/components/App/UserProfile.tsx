"use client";

import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Icon,
  Button,
  useDisclosure,
  Image,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { FaTelegramPlane } from "react-icons/fa";
import {
  IoMenu,
  IoChevronForward,
  IoAdd,
  IoChatbubbleEllipsesOutline,
  IoGlobeOutline,
} from "react-icons/io5";
import FileUpload from "./FileUpload";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type User = {
  user4: any;
  handleClearChats: () => Promise<void>;
  selectedPdf: string;
  onGlobal: () => void;
  handlePdfClick: (pdf: string) => void;
  onReload: () => Promise<void>;
  pdfList: any[];
};

export default function UserProfile({
  user4,
  handleClearChats,
  selectedPdf,
  handlePdfClick,
  onGlobal,
  onReload,
  pdfList,
}: User | any) {
  // const [pdfList, setPdfList] = useState<any[]>([]);
  // const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
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
  const supabase = createClientComponentClient();

  if (user4) {
    username = user4.user_metadata.username;
  }

  const router = useRouter();
  const toast = useToast();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const fileName = localStorage.getItem("file");
  // const handleChat = () => {
  //   localStorage.removeItem("responses");
  //   localStorage.removeItem("requests");
  //   toast({
  //     title: "Chat Cleared",
  //     position: "top-right",
  //     description: "You have cleared the chat",
  //     status: "success",
  //     variant: "left-accent",
  //     duration: 5000,
  //     isClosable: true,
  //   });
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 1000);
  // };

  useEffect(() => {
    // const onReload = async () => {
    //   const listOfPdfs = async () => {
    //     const condition = { column_value: user4.id }; // Replace with your own condition
    //     const arr: any[] = []

    //     function delay(ms: number | undefined) {
    //       return new Promise(resolve => setTimeout(resolve, ms));
    //     }

    //     const data: any[] | any = await delay(5000).then(async () => {
    //       const { data, error } = await supabase
    //         .from('booklist')
    //         .select('*')
    //         .eq('user_id', condition.column_value);

    //       if (error) {
    //         console.log(error);
    //       } else {
    //         console.log("This is the list of books: " + JSON.stringify(data));
    //         return data;
    //       }
    //     });

    //     console.log(data)
    //     data.map((element: any) => (
    //       arr.push(element.book_name)
    //     ))
    //     return arr;
    //   }

    //   const pdfList: any = await listOfPdfs()

    //   const uniqueArrayPdfList = pdfList.filter(
    //     (value: any, index: any, self: any) => self.indexOf(value) === index
    //   );
    //   console.log(uniqueArrayPdfList);
    //   setPdfList(uniqueArrayPdfList)
    // }

    onReload();
  }, []);

  // Add this function to set the selected PDF when a Flex is clicked
  // const handlePdfClick = (pdf: string) => {
  //   localStorage.setItem("file", pdf)
  //   setSelectedPdf(pdf);
  // };

  return (
    <HStack ml={1}>
      {user4 && (
        <>
          <Text zIndex={2} ml={5}>
            Hi, {username}
          </Text>
        </>
      )}
      <Flex
        _hover={{ bg: "red.500", color: "white" }}
        borderRadius="full"
        border="1px solid"
        color="red.500"
        borderColor="red.500"
        bg={{ base: "none", md: "none" }}
        minW={{ base: 20, md: 40 }}
        h={{ base: 8, md: 12 }}
        cursor="pointer"
        justify="center"
        align="center"
        display={{ base: "none", lg: "flex" }}
        onClick={handleClearChats}
      >
        <Text fontWeight={600} fontSize="0.9em">
          Clear Chat
        </Text>
      </Flex>
      <Text zIndex={2} mr={{ base: -10, md: 0 }} ml={5}>
        25
      </Text>
      <Flex mr={{ base: -7, md: 0 }} ml={{ base: 0, md: -10 }}>
        <Image src="/star.gif" w="100px" zIndex={-1} />
      </Flex>
      <Flex justify="end" display={{ base: "flex", lg: "none" }}>
        <IconButton
          variant="ghost"
          aria-label="menu"
          icon={<Icon as={IoMenu} w="5" h="5" />}
          onClick={onDrawerOpen}
        />
      </Flex>

      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            {/* <Flex direction="column" textAlign="start" align="start" gap={5}>
              {links.map((link) => (
                <Button variant="link" key={link.path} color="#008F06">
                  {link.text}
                </Button>
              ))}
            </Flex> */}
            {/* <Divider mt={10} /> */}
            <Flex mt="2" align="center" gap={5} direction="column-reverse">
              <Flex
                align="center"
                gap="1"
                cursor="pointer"
                color="#008F06"
                _hover={{ color: "#005103", fontWeight: 500 }}
                role="group"
                onClick={() => router.push("https://t.me/NEARCommunity")}
                pos="fixed"
                bottom={10}
              >
                <Icon
                  as={FaTelegramPlane}
                  bgColor="#008F06"
                  color="#FFF"
                  _groupHover={{ bg: "#005103" }}
                  p={1}
                  borderRadius="full"
                  w="7"
                  h="7"
                />
                <Text>Join our Community</Text>
              </Flex>

              {pdfList.map(
                (
                  pdf:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | React.PromiseLikeOfReactNode
                    | null
                    | undefined
                    | any,
                  index: React.Key | null | undefined
                ) => (
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
                    _hover={{ color: "#005103", bg: "#90E768" }}
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
                )
              )}

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

              <Flex
                _hover={{ bg: "red.500", color: "white" }}
                borderRadius="full"
                border="1px solid"
                color="red.500"
                borderColor="red.500"
                bg={{ base: "none", md: "none" }}
                w="full"
                h={12}
                cursor="pointer"
                justify="center"
                align="center"
                onClick={handleClearChats}
              >
                <Text fontWeight={600} fontSize="0.9em">
                  Clear Chat
                </Text>
              </Flex>

              {user4 && (
                <Flex
                  _hover={{ bg: "red.500", color: "white" }}
                  borderRadius="full"
                  border="1px solid"
                  color="red.500"
                  borderColor="red.500"
                  bg={{ base: "none", md: "none" }}
                  w="full"
                  h={12}
                  cursor="pointer"
                  justify="center"
                  align="center"
                >
                  <form action="/auth/signout" method="post">
                    <button type="submit">
                      <Text fontWeight={600} fontSize="0.9em">
                        Logout
                      </Text>
                    </button>
                  </form>
                </Flex>
              )}
            </Flex>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>

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
            <FileUpload user3={user4} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
}
