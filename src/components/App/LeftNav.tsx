import { Flex, Icon, Text, Image } from "@chakra-ui/react"
import { AiFillHome, AiOutlineHome, AiOutlineProfile, AiFillProfile } from "react-icons/ai"
import { RiContactsBookFill, RiContactsBookLine } from "react-icons/ri"
import { IoChatbubbleEllipsesOutline, IoChatbubbleEllipses, IoFolderOutline, IoFolder, IoTrendingUp, IoSettings, IoSettingsOutline} from "react-icons/io5";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { useRouter } from "next/router"

const LeftNav = () => {
  const router = useRouter();

  const links = [
    { path: "/app", iconActive: AiFillHome, iconInactive: AiOutlineHome, text: "Home" },
    { path: "/app/chat", iconActive: IoChatbubbleEllipses, iconInactive: IoChatbubbleEllipsesOutline, text: "Chat" },
    // { path: "#", iconActive: IoFolder, iconInactive: IoFolderOutline, text: "My Folders", isDisabled: true },
    // { path: "#", iconActive: IoTrendingUp, iconInactive: IoTrendingUp, text: "My Stats", isDisabled: true },
    // { path: "#", iconActive: BsBoxArrowUpRight, iconInactive: BsBoxArrowUpRight, text: "Guidelines", isDisabled: true },
  ];

  return (
    <Flex
      display={{ base: 'none', lg: 'flex'}}
      direction="column"
      bg="#EBEBEB"
      minH="full"
      w={{ base: "70px",md: "130px"}}
      pos="fixed"
      mx="auto"
      px={{ base: 0, md: 5 }}
      pt={10}
      align="center"
      justify="start"
      zIndex={-1}
    >

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
          color={router.pathname === link.path ? "#FFFFFF": "#A5A5A5"}
          bg={router.pathname === link.path ? "#53AF28": "none"}
          onClick={() => router.push(link.path)}
          
        >
          <Icon as={router.pathname === link.path ? link.iconActive : link.iconInactive} w={6} h={6} mb={2} />
          <Text fontSize={13} fontWeight={router.pathname === link.path ? 500 : 400}>
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
          color={router.pathname === "/app/feedback" ? "#53AF28": "#A5A5A5"}
          onClick={() => router.push('/app/feedback')}
          
        >
          <Icon as={BsEmojiHeartEyes} w={6} h={6} mb={2} />
          <Text fontSize={12} fontWeight={router.pathname === "/app/feedback" ? 500 : 400}>
            Send Feedback
          </Text>
        </Flex>
      </Flex>


    </Flex>
  );
}

export default LeftNav;