import { Flex, Icon, Text, useToast } from "@chakra-ui/react";
import {
  AiFillHome,
  AiOutlineHome,
} from "react-icons/ai";
import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipses,
  IoLogOutOutline,
} from "react-icons/io5";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { useRouter, usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import { IconType } from "react-icons";

// Types
interface NavLink {
  path: string;
  iconActive: IconType;
  iconInactive: IconType;
  text: string;
}

interface NavItemProps {
  link: NavLink;
  isActive: boolean;
  onClick: (path: string) => void;
}

// Constants
const NAV_LINKS: NavLink[] = [
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
];

const COLORS = {
  background: "#EBEBEB",
  active: "#53AF28",
  activeText: "#FFFFFF",
  inactive: "#A5A5A5",
  hover: "#90E768",
  hoverText: "#005103",
} as const;

// Navigation Item Component
const NavItem = ({ link, isActive, onClick }: NavItemProps) => (
  <Flex
    direction="column"
    mt={7}
    w="full"
    py={2}
    align="center"
    role="group"
    _hover={{ color: COLORS.hoverText, bg: COLORS.hover }}
    borderRadius="md"
    cursor="pointer"
    color={isActive ? COLORS.activeText : COLORS.inactive}
    bg={isActive ? COLORS.active : "none"}
    onClick={() => onClick(link.path)}
  >
    <Icon
      as={isActive ? link.iconActive : link.iconInactive}
      w={6}
      h={6}
      mb={2}
    />
    <Text fontSize={13} fontWeight={isActive ? 500 : 400}>
      {link.text}
    </Text>
  </Flex>
);

// Bottom Action Button Component
interface BottomActionProps {
  icon: IconType;
  text: string;
  isActive?: boolean;
  onClick: () => void;
}

const BottomAction = ({ icon, text, isActive, onClick }: BottomActionProps) => (
  <Flex
    direction="column"
    mt={10}
    w="full"
    py={2}
    px={4}
    align="center"
    role="group"
    _hover={{ color: COLORS.hoverText, bg: COLORS.hover }}
    borderRadius="md"
    cursor="pointer"
    color={isActive ? COLORS.active : COLORS.inactive}
    onClick={onClick}
  >
    <Icon as={icon} w={6} h={6} mb={2} />
    <Text fontSize={12} fontWeight={isActive ? 500 : 400}>
      {text}
    </Text>
  </Flex>
);

// Main Component
const LeftNav = () => {
  const router = useRouter();
  const toast = useToast();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const showToast = useCallback(
    (title: string, description: string, status: "success" | "error") => {
      toast({
        title,
        description,
        status,
        variant: "left-accent",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
    [toast]
  );

  const handleNavigation = useCallback(
    (path: string) => {
      setLoading(true);
      router.push(path);
    },
    [router]
  );

  const handleLogout = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await fetch("/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        showToast(
          "Signout Complete",
          "You have successfully signed out",
          "success"
        );
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setLoading(false);
        showToast(
          "Could not signout",
          "Error completing signout process",
          "error"
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Logout error:", error);
      showToast(
        "Could not signout",
        "Error completing signout process",
        "error"
      );
    }
  }, [router, showToast]);

  return (
    <Flex
      display={{ base: "none", lg: "flex" }}
      direction="column"
      bg={COLORS.background}
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
      
      {/* Main Navigation Links */}
      {NAV_LINKS.map((link) => (
        <NavItem
          key={link.path}
          link={link}
          isActive={pathname === link.path}
          onClick={handleNavigation}
        />
      ))}

      {/* Bottom Actions */}
      <Flex direction="column" pos="fixed" bottom={5}>
        <BottomAction
          icon={IoLogOutOutline}
          text="Logout"
          onClick={handleLogout}
        />
        <BottomAction
          icon={BsEmojiHeartEyes}
          text="Send Feedback"
          isActive={pathname === "/app/feedback"}
          onClick={() => handleNavigation("/app/feedback")}
        />
      </Flex>
    </Flex>
  );
};

export default LeftNav;
