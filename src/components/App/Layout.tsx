import {
  Text,
  Flex,
  Image,
  Box,
} from "@chakra-ui/react";
import UserProfile from "./UserProfile";
import { useRouter } from "next/router";
import LeftNav from "./LeftNav";

export default function Layout() {
  const router = useRouter();


  return (
    <Flex w="full" zIndex={5} pos="fixed">
        <Flex
        zIndex="3"
        top="0"
        bg="white"
        h={14}
        pl={12}
        pr={3}
        alignItems="center"
        justifyContent="space-between"
        w="full"
        overflow='hidden'
        boxShadow="md"
        >
        <Flex justify="flex-start" align="center" gap={2}>
            <Image src="/logo.png" alt="grayaxis" w="40px" pointerEvents="none" />
            <Text fontSize={18} fontWeight="700" color="#202020">
            Lecture Mate
            </Text>
        </Flex>

        <Flex justify="flex-end">
            <UserProfile  />
        </Flex>
        </Flex>
        <LeftNav />
    </Flex>
  );
}
