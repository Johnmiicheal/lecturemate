"use client";
import React, {useState} from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import { IoChevronForward } from "react-icons/io5";

const WIPAlert = ({ isOpen, onClose }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    router.push('https://t.me/NEARCommunity');
    setLoading(true);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", lg: "lg" }}>
      <ModalOverlay />
      <ModalContent
        minW={{ base: "10rem", lg: "33rem" }}
        minH="20rem"
        borderColor="white"
        borderRadius="10px"
      >
        <ModalHeader
          borderRadius="10px 10px 0 0 "
          // bgGradient="linear(to-l, #00F0FF, #53AF28)"
          bgColor="#53AF28"
        >
          🚧 Lecture Mate - Work in Progress 🚧
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={7}>
          <Alert
            status="info"
            variant="left-accent"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            bg="white"
            border="white"
          >
            <AlertTitle mb={4} fontSize="lg">
              Hi there👋
            </AlertTitle>
            <AlertDescription maxWidth="lg" textAlign="justify">
              We are working hard and fast to deliver this feature to you so you can have a seamless
              experience. Don't worry, we'll be ready sooner than you expect
              it🚀
              <br />
              <br />
              In the mean time, why not join our Community to get more updates
            </AlertDescription>
            <AlertDialogFooter>
              <Button
                variant="solid"
                borderRadius="full"
                px={4}
                color="white"
                bg="#202020"
                _hover={{ bgGradient: "linear(to-l, #00F0FF, #53AF28)" }}
                rightIcon={<IoChevronForward />}
                fontWeight={500}
                fontSize={14}
                isLoading={loading}
                onClick={ handleClick }
              >
                Join our Community
              </Button>
            </AlertDialogFooter>
          </Alert>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WIPAlert;