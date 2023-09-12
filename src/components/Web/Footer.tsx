import React from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Divider,
  Button,
  Link,
} from "@chakra-ui/react";
import { IoLogoTwitter, IoLogoLinkedin, IoLogoGithub, IoLogoInstagram } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter()
  let year = new Date().getFullYear();
  const links = [
    { path: "/features", text: "Features" },
    { path: "/resources", text: "Resources" },
    { path: "/pricing", text: "Pricing" },
  ];
  const socials = [
    // { path: "https://twitter.com/johnmiiiicheal", iconActive: IoLogoTwitter, text: "Twitter" },
    {
      path: "https://github.com/johnmiicheal/lecturemate",
      iconActive: IoLogoGithub,
      text: "Github",
    },
    {
      path: "https://www.instagram.com/lecturemate.ai/",
      iconActive: IoLogoInstagram,
      text: "Instagram",
    },
  ];
  const foot = [
    { path: "/privacy", text: "Privacy Policy" },
    { path: "/terms", text: "Terms of Service" },
  ];
  return (
    <Flex
      bg="white"
      direction="column"
      w="full"
      align="center"
      px={{ base: 10, md: 18, lg: 24 }}
      pt={10}
      overflow="hidden"
    >
    
        <Flex
          gap={5}
          justify="center"
          align="center"
        >
          {socials.map((social) => (
            <Button
              variant="link"
              key={social.path}
              color="#7A7A7A"
              leftIcon={<social.iconActive />}
              onClick={() => router.push(social.path)}
              
            >
              {social.text}
            </Button>
          ))}
          </Flex>
          {/* {links.map((link) => (
                        <Button variant="link" key={link.path} color="#7A7A7A">{link.text}</Button>
                    ))}
      {/* </Flex>
      </Flex>
      <Box w="full" h="0.3" bgColor="gray.300" mt={6} />
      <Flex
        ml={{ md: "auto" }}
        gap={{ base: 3, md: 8 }}
        mt={6}
        direction={{ base: "column", md: "row" }}
      >
        <Text
          textStyle="text"
          color="#7a7a7a"
          w={{ base: "full", md: "12rem" }}
        >
          &#169; {year} Lecture Mate, Inc.
        </Text>
        {foot.map((foots) => (
          <Button
            variant="link"
            key={foots.path}
            color="#7A7A7A"
            fontWeight={400}
          >
            {foots.text}
          </Button>
        ))}
      </Flex> */}
      <Flex mt={{ base: 10, lg: 5 }} gap="2">
        <a
          href="https://theresanaiforthat.com/ai/lecture-mate/?ref=featured&v=402205"
          target="_blank"
        >
          <Image
            height={14}
            src="https://media.theresanaiforthat.com/featured3.png"
          />
        </a>

        <a
          href="https://www.producthunt.com/posts/lecture-mate?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-lecture&#0045;mate"
          target="_blank"
        >
          <Image
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=404958&theme=neutral"
            alt="Lecture&#0032;Mate - Unlocking&#0032;the&#0032;power&#0032;of&#0032;knowledge | Product Hunt"
            height="14"
          />
        </a>
      </Flex>
    </Flex>
  );
};

export default Footer;
