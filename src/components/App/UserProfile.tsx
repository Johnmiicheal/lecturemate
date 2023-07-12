import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuGroup,
  Badge,
  VStack,
  AvatarBadge,
  Button,
  useDisclosure,
  useColorModeValue,
  Image,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

export default function UserProfile() {
  const router = useRouter();
  const toast = useToast();
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
        minW={{ base: 0, md: 40 }}
        h={{ base: 0, md: 12 }}
        cursor="pointer"
        justify="center"
        align="center"
        onClick={handleChat}
      >
        <Text fontWeight={600} fontSize="0.9em">
          Clear Chat
        </Text>
      </Flex>
      <Text zIndex={2} ml={5}>
        25
      </Text>
      <Flex ml={-10}>
        <Image src="/star.gif" w="100px" zIndex={-1} />
      </Flex>
    </HStack>
  );
}
