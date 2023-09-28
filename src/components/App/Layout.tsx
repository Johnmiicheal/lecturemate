import {
  Text,
  Flex,
  Image,
  Box,
} from "@chakra-ui/react";
import UserProfile from "./UserProfile";
import { useRouter } from "next/navigation";
import LeftNav from "./LeftNav";

export default function Layout({user3}: any) {
  const router = useRouter();

  return (
    <Flex w="full" zIndex={5} pos="fixed">
        <Flex
        zIndex="3"
        top="0"
        bg="white"
        h={14}
        pl={{ base: 2, md: 12 }}
        pr={{ base:0 , md: 3 }}
        alignItems="center"
        justifyContent="space-between"
        w="full"
        overflow='hidden'
        boxShadow="md"
        >
        <Flex justify="flex-start" align="center" gap={2}  onClick={() => router.push('/')} cursor='pointer'>
            <Image src="/logo.png" alt="grayaxis" w="40px" pointerEvents="none" />
            <Text fontSize={18} fontWeight="700" display={{ base: 'none', md: 'block'}} color="#202020">
            Lecture Mate
            </Text>
        </Flex>

        <Flex justify="flex-end">
            <UserProfile  user4 = {user3}/>
        </Flex>
        </Flex>
        <LeftNav />
    </Flex>
  );
}
