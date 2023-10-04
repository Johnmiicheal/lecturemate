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
import { useRouter, usePathname } from "next/navigation";
import {
  IoChevronForward,
  IoLogoGithub,
  IoLogoInstagram,
  IoMenu,
} from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";


const Header = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = React.useState(false);

  const scrollToAnchor = (point: string) => {
    const anchorDiv = document.getElementById(point);
    if (anchorDiv) {
      anchorDiv.scrollIntoView({ behavior: "smooth" });
    }
  };
  const links = [
    { path: "#", text: "Home", point: "home" },
    { path: "#features", text: "Features", point: "features" },
    { path: "#vision", text: "Vision", point: "vision" },
    { path: "#faq", text: "FAQ", point: "faq" },
  ];
  const socials = [
    {
      path: "https://github.com/johnmiicheal/lecturemate",
      iconActive: IoLogoGithub,
      text: "Github",
    },
    {
      path: "https://www.instagram.com/lecturemate.ai",
      iconActive: IoLogoInstagram,
      text: "Instagram",
    },
  ];
  const handleClick = () => {
    router.push("/app");
    if (pathname !== "/app") {
      setIsLoading(true);
    }
  };

  return (
    <Flex
      display="flex"
      bg="#1C1C1C70"
      css={{
        "-webkit-backdrop-filter": "blur(5px)",
        "backdrop-filter": "blur(5px)",
      }}
      border="1px solid #8D8D8D"
      borderRadius="10px"
      py={2}
      px={{ base: 2, lg: 4 }}
      color="white"
      zIndex="1"
      top="0"
      w="full"
      align="center"
      justify="space-between"
    >
      <Flex justify="start" gap={10}>
        <Flex
          align="center"
          gap={2}
          onClick={() => router.push("/")}
          cursor="pointer"
        >
          <Image
            src="/logo.png"
            alt="Lecture Mate Logo"
            w="30px"
            pointerEvents="none"
          />
          <Text fontSize={18} fontWeight="700" color="#FFFFFF">
            Lecture Mate
          </Text>
        </Flex>
      </Flex>
      <Flex gap={14}>
        {links.map((link) => (
          <Button
            display={{ base: "none", md: "flex" }}
            variant="link"
            key={link.path}
            color="#FFFFFF"
            _hover={{ bg: "none", color: "#53AF28" }}
            fontWeight={500}
            fontSize={14}
            onClick={() => scrollToAnchor(link.point)}
          >
            {link.text}
          </Button>
        ))}
      </Flex>
      {/* <Flex
        justify="end"
        ml={10}
        display="none"
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
          onClick={handleClick}
          fontWeight={500}
          fontSize={14}
          isLoading={isLoading}
        >
          Try it out
        </Button>

      </Flex> */}

      <Flex gap={3} display={{ base: "none", md: "flex" }}>
        {socials.map((link) => (
          <IconButton
            icon={<link.iconActive />}
            aria-label="social links"
            variant="ghost"
            _hover={{ bg: "none", color: "#53AF28" }}
            key={link.path}
            color="#FFFFFF"
            onClick={() => router.push(link.path)}
          />
        ))}
      </Flex>

      <Flex justify="end" display={{ base: "flex", md: "none" }}>
        <IconButton
          variant="ghost"
          color="#FFFFFF"
          aria-label="menu"
          icon={<IoMenu />}
          onClick={onDrawerOpen}
        />
      </Flex>

      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent
          css={{
            "-webkit-backdrop-filter": "blur(6px)",
            "backdrop-filter": "blur(6px)",
          }}
          bg="#4E4E4E70"
          borderRadius="20px 0 0 20px"
        >
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white">Menu</DrawerHeader>

          <DrawerBody>
            {/* <Divider mt={10} /> */}
            <Flex mt="2" justify="start" gap={5} direction="column-reverse">
              <Flex
                align="center"
                justify="center"
                gap="1"
                cursor="pointer"
                borderRadius="full"
                color="#FFFFFF"
                py={2}
                bg="#008F06"
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
                onClick={() => router.push("/app")}
                fontWeight={500}
                fontSize={14}
              >
                Use Lecture Mate
              </Button>
          <Flex direction="column" justify="center" ml={-2} pos="fixed" bottom={5} bg="#202020" borderRadius='md' gap={2} p={3}>
            <Text color="white">
              Connect with us on our social media
            </Text>
            <Flex gap={5}>
              {socials.map((link) => (
                <IconButton
                  icon={<link.iconActive />}
                  size="lg"
                  aria-label="social links"
                  variant="solid"
                  _hover={{ bg: "none", color: "#53AF28" }}
                  key={link.path}
                  color="#FFFFFF"
                  bg="#88888850"
                  onClick={() => router.push(link.path)}
                />
              ))}
            </Flex>
          </Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Header;
