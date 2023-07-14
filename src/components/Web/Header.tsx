import {
  Flex,
  Image,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertTitle,
  AlertDescription,
  IconButton,
  Icon,
  AlertDialogFooter,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import {
  IoChevronForward,
  IoFlash,
  IoFlashOutline,
  IoMenu,
} from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const router = useRouter();
  const links = [
    { path: "/features", text: "Features" },
    { path: "/resources", text: "Resources" },
    { path: "/pricing", text: "Pricing" },
  ];

  return (
    <Flex
      display="flex"
      zIndex="1"
      top="0"
      w="full"
      align="center"
      justify="space-between"
      h={12}
    >
      <Flex justify="start" gap={10}>
        <Flex align="center" gap={2}>
          <Image
            src="/logo.png"
            alt="Graybook Logo"
            w="40px"
            pointerEvents="none"
          />
          <Text fontSize={18} fontWeight="700" color="#202020">
            Lecture Mate
          </Text>
        </Flex>
        {/* {links.map((link) => (
          <Button
            display={{ base: "none", md: "flex" }}
            variant="link"
            key={link.path}
            color="#202020"
            fontWeight={500}
            fontSize={14}
            mr={-3}
          >
            {link.text}
          </Button>
        ))} */}
      </Flex>
      <Flex
        justify="end"
        ml={10}
        display={{ base: "none", md: "flex" }}
        gap={5}
      >
        <Flex
          align="center"
          gap="1"
          cursor="pointer"
          color="#008F06"
          _hover={{ color: "#005103", fontWeight: 500 }}
          role="group"
          onClick={() => router.push("https://t.me/NEARCommunity")}
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
        <Button
          variant="solid"
          borderRadius="full"
          px={4}
          color="white"
          bg="#202020"
          _hover={{ bg: "#303030" }}
          rightIcon={<IoChevronForward />}
          onClick={() => router.push('/app')}
          fontWeight={500}
          fontSize={14}
        >
          Use Demo
        </Button>
      </Flex>

      <Flex justify="end" display={{ base: "flex", md: "none" }}>
        <IconButton
          variant="ghost"
          aria-label="menu"
          icon={<IoMenu />}
          onClick={onDrawerOpen}
        />
      </Flex>

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
                In the mean time, why not click on the button to join the
                Waitlist
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
            <Flex mt="2" justify="start" gap={10} direction="column-reverse">
              <Flex
                align="center"
                gap="1"
                cursor="pointer"
                color="#008F06"
                _hover={{ color: "#005103", fontWeight: 500 }}
                role="group"
                onClick={() => router.push("https://t.me/NEARCommunity")}
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
              <Button
                variant="solid"
                borderRadius="full"
                px={4}
                color="white"
                bg="#202020"
                _hover={{ bg: "#303030" }}
                rightIcon={<IoChevronForward />}
                onClick={onOpen}
                fontWeight={500}
                fontSize={14}
              >
                Use Demo
              </Button>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
           
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Header;
