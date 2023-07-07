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
  } from "@chakra-ui/react";
  import React from "react";
  import { useRouter } from "next/router";
  
  export default function UserProfile() {
    const router = useRouter();  
    return (
      <HStack ml={1}>
      
          <Flex
            _hover={{ bg: "#E6E6E6", color: "#000a16" }}
            borderRadius="full"
            border="1px solid #E6E6E6"
            bg={{ base: "none", md: "none" }}
            minW={{ base: 0, md: 40 }}
            h={{ base: 0, md: 12 }}
            cursor="pointer"
            align='center'
          >
                <Flex
                  align="center"
                  display={{ base: "none", md: "flex" }}
                  pr={4}
                >
                  <Avatar src="notfound" name="John Constantine" size="sm" ml={1} mr={1} border="1px solid #00F0FF" />
                  <Flex
                    direction="column"
                    textAlign="start"
                    justify="center"
                    display={{ base: "none", md: "flex" }}
                    gap="1px"
                  >
                    <Text fontWeight={600} fontSize="0.9em">
                    John Constantine
                    </Text>
                  </Flex>
                </Flex>
        </Flex>
        <Text zIndex={2} ml={5}>25</Text>
        <Flex ml={-10}>
        <Image src="/star.gif" w="100px" zIndex={-1} />
        </Flex>
      </HStack>
    );
  }