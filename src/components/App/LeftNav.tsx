import { Flex, Icon, Text, Image, useToast } from "@chakra-ui/react";
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlineProfile,
  AiFillProfile,
} from "react-icons/ai";
import { RiContactsBookFill, RiContactsBookLine } from "react-icons/ri";
import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipses,
  IoFolderOutline,
  IoFolder,
  IoTrendingUp,
  IoSettings,
  IoSettingsOutline,
  IoLogOut,
  IoLogOutOutline,
} from "react-icons/io5";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import TopBarProgress from "react-topbar-progress-indicator";

const LeftNav = () => {
  const router = useRouter();
  const toast = useToast();
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(false);

  const links = [
    {
      path: "/app",
      iconActive: AiFillHome,
      iconInactive: AiOutlineHome,
      text: "Home",
    },
    {
      path: "/app/chat",
      iconActive: IoChatbubbleEllipses,
      iconInactive: IoChatbubbleEllipsesOutline,
      text: "Chat",
    },
    // { path: "#", iconActive: IoFolder, iconInactive: IoFolderOutline, text: "My Folders", isDisabled: true },
    // { path: "#", iconActive: IoTrendingUp, iconInactive: IoTrendingUp, text: "My Stats", isDisabled: true },
    // { path: "#", iconActive: BsBoxArrowUpRight, iconInactive: BsBoxArrowUpRight, text: "Guidelines", isDisabled: true },
  ];

  const handleLogout = () => {
    setLoading(true)
    fetch("/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setLoading(false);
          toast({
            title: "Signout Complete",
            description: `You have successfully Signed out`,
            status: "success",
            variant: "left-accent",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          setTimeout(() => {
            router.push('/');
          }, 1000)
        } else {
          toast({
            title: "Could not signout",
            description: `Error completing signout process`,
            status: "error",
            variant: "left-accent",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };
  return (
    <Flex
      display={{ base: "none", lg: "flex" }}
      direction="column"
      bg="#EBEBEB"
      minH="full"
      w={{ base: "70px", md: "130px" }}
      pos="fixed"
      mx="auto"
      px={{ base: 0, md: 5 }}
      pt={10}
      align="center"
      justify="start"
      zIndex={-1}
    >
      {loading && <TopBarProgress />}
      {links.map((link) => (
        <Flex
          key={link.text}
          direction="column"
          mt={7}
          w="full"
          py={2}
          align="center"
          role="group"
          _hover={{ color: "#005103", bg: "#90E768" }}
          borderRadius="md"
          cursor="pointer"
          color={pathname === link.path ? "#FFFFFF" : "#A5A5A5"}
          bg={pathname === link.path ? "#53AF28" : "none"}
          onClick={() => router.push(link.path)}
          display={link.text === "Chat" ? "none" : "flex"}
        >
          <Icon
            as={pathname === link.path ? link.iconActive : link.iconInactive}
            w={6}
            h={6}
            mb={2}
          />
          <Text fontSize={13} fontWeight={pathname === link.path ? 500 : 400}>
            {link.text}
          </Text>
        </Flex>
      ))}

      <Flex direction="column" pos="fixed" bottom={5}>
        <Flex
          direction="column"
          mt={10}
          w="full"
          py={2}
          px={4}
          align="center"
          role="group"
          _hover={{ color: "#005103", bg: "#90E768" }}
          borderRadius="md"
          cursor="pointer"
          color={"#A5A5A5"}
          onClick={handleLogout}
        >
          <Icon as={IoLogOutOutline} w={6} h={6} mb={2} />
          <Text fontSize={12} fontWeight={400}>
            Logout
          </Text>
        </Flex>
        <Flex
          direction="column"
          mt={10}
          w="full"
          py={2}
          px={4}
          align="center"
          role="group"
          _hover={{ color: "#005103", bg: "#90E768" }}
          borderRadius="md"
          cursor="pointer"
          color={pathname === "/app/feedback" ? "#53AF28" : "#A5A5A5"}
          onClick={() => router.push("/app/feedback")}
        >
          <Icon as={BsEmojiHeartEyes} w={6} h={6} mb={2} />
          <Text
            fontSize={12}
            fontWeight={pathname === "/app/feedback" ? 500 : 400}
          >
            Send Feedback
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LeftNav;
