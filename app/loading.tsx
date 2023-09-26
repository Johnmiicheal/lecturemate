"use client"
import { Flex, Box, Image, Text, Center } from "@chakra-ui/react"
import BarLoader from "react-spinners/BarLoader";

const Loading = () => {
    return(

        <Flex justify="center" mt="10%">
        <Box minW="full">
          <Flex
            direction="column"
            align="center"
            minW={{ base: "full", lg: "650px" }}
          >
            <Image src="/biglogo.png" alt="lecturemate logo" w="20%" mb={10} />
            <BarLoader color="#53AF28" width="150px" />
          </Flex>
        </Box>
      </Flex>
    )
}

export default Loading;