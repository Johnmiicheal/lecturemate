import { IconButton, Flex, Image, Box, Center, Button  } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

export default function LoginBar({ onOpen, ...rest }: any) {
  const router = useRouter(); 
  const pathname = usePathname();
  const [label, setLabel] = React.useState("");
  const [route, setRoute] = React.useState("");
  return (
 
    <Flex
      display='flex'
      zIndex='3'
      px={{ base: 4, md: 4, lg: "40px"}}
      top="0"
      bg = "white"
      w="full"
      position="fixed"      
      h={16}
      alignItems="center"      
      justifyContent={{ base: "space-between", md: "space-between" }}
      boxShadow="md"
     
      {...rest}
    >
      <Flex justify='flex-start' onClick={() => router.push('/')} cursor='pointer'>
        <Image src="/logo.png" alt="Lecture mate logo" w={10} pointerEvents='none' />
      </Flex>
      
      <Flex justify='flex-end'>
        <Button px={8} py={5} borderWidth={1} borderColor="#53AF28" bg="#53AF2820" color="#53AF28" onClick={() => router.push(
          pathname === '/signin' ? '/signup' : '/signin'
        )}>
          {pathname === '/signin' ? 'Create an Account' : 'Sign In to Account'}
        </Button>
      </Flex>     

      </Flex>

  );
}