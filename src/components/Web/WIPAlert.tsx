"use client";

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
import router from "next/router";
import { IoChevronForward } from "react-icons/io5";

const WIPAlert = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
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
          Lecture Mate - Waitlist
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
            <AlertTitle mb={1} fontSize="lg">
              Hi there👋
            </AlertTitle>
            <AlertDescription maxWidth="lg" textAlign="justify">
              We are working hard and fast to deliver to you a seamless
              experience. Don't worry, we'll be ready sooner than you expect
              it🚀
              <br />
              <br />
              In the mean time, why not click on the button to join the Waitlist
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
                onClick={onOpen}
                fontWeight={500}
                fontSize={14}
                onClickCapture={() =>
                  router.push(
                    "https://docs.google.com/forms/d/e/1FAIpQLSd0z5h-9jIpsp4jP3gaXEsiaJDy0A-gFjmGYjS3DuL_Do2cEA/viewform"
                  )
                }
              >
                Join Waitlist
              </Button>
            </AlertDialogFooter>
          </Alert>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WIPAlert;