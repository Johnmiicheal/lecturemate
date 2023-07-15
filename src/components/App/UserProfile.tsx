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
import React from "react";
import { useRouter } from "next/router";
import { FaTelegramPlane } from "react-icons/fa";
import { IoMenu, IoChevronForward, IoAdd, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import FileUpload from "./FileUpload";

export default function UserProfile() {
  const router = useRouter();
  const toast = useToast();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileName = localStorage.getItem("file");
  const handleChat = () => {
    localStorage.removeItem("responses");
    localStorage.removeItem("requests");
    toast({
      title: "Chat Cleared",
      position: "top-right",
      description: "You have cleared the chat",
      status: "success",
      variant: "left-accent",
      duration: 5000,
      isClosable: true,
    });
    setTimeout(() => {
      router.reload();
    }, 1000);
  };
  return (
    <HStack ml={1}>
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
        display={{ base: "none", lg: "block" }}
        onClick={handleChat}
      >
        <Text fontWeight={600} fontSize="0.9em">
          Clear Chat
        </Text>
      </Flex>
      <Text zIndex={2} mr={{ base: -10, md: 0 }} ml={5}>
        25
      </Text>
      <Flex mr={{ base: -7, md: 0}} ml={{ base: 0, md: -10 }}>
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

              {fileName && (
                <Flex
                  h="50px"
                  mt={5}
                  gap={2}
                  justify="start"
                  align="center"
                  bg="#53AF28"
                  color="white"
                  w="full"
                  border="1px solid #53AF28"
                  _hover={{ color: "#005103", bg: "#90E768" }}
                  pl={3}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={onOpen}
                >
                  <Icon as={IoChatbubbleEllipsesOutline} w="5" h="5" />
                  <Text noOfLines={1} textOverflow="ellipsis">
                    {fileName}
                  </Text>
                </Flex>
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
                onClick={handleChat}
              >
                <Text fontWeight={600} fontSize="0.9em">
                  Clear Chat
                </Text>
              </Flex>
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
            <FileUpload />
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
}
