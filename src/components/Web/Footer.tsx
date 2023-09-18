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
import {
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoGithub,
  IoLogoInstagram,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import { PiArrowUpBold } from "react-icons/pi";

const Footer = () => {
  const router = useRouter();
  let year = new Date().getFullYear();
  const scrollToAnchor = () => {
    const anchorDiv = document.getElementById("home");
    if (anchorDiv) {
      anchorDiv.scrollIntoView({ behavior: "smooth" });
    }
  };
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
      bg="#22391F"
      direction="column"
      w="full"
      align="start"
      px={{ base: 5, md: 18, lg: 32 }}
      py={10}
      overflow="hidden"
    >
      <Text
        fontFamily="sans-serif"
        css={{
          "-webkit-text-fill-color": "#22391F",
          "-webkit-text-stroke-width": "1px",
          "-webkit-text-stroke-color": "white",
        }}
        w="full"
        fontSize={{ base: '4em', lg: "9em"}}
        fontWeight="bold"
      >
        Thank You
      </Text>
      <Flex justify="space-between" w="full" direction={{ base: 'column', md: 'row'}} gap={2} mt={{base: 5, md: 0 }}>
        <Flex align="center" gap={2}>
          <Image src="/logowhite.png" w={{ base: '7%', md: "15%"}} pointerEvents="none" />
          <Text fontSize={18} fontWeight="700" color="#FFFFFF">
            Lecture Mate
          </Text>
        </Flex>
        <Flex justify="end">
          <Text fontSize={18} color="white">
            © Copyright Lecture Mate {year}. All Rights Reserved.
          </Text>
        </Flex>
      </Flex>

      {/* <Flex gap={5} justify="start" mt={5}>
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
      </Flex> */}
      <Flex align="center" direction={{ base: 'column', md: 'row'}} justify="space-between" w="full" mt={{ base: 10, lg: 5 }} >
        <Flex gap="2" >
          <a
            href="https://theresanaiforthat.com/ai/lecture-mate/?ref=featured&v=402205"
            target="_blank"
          >
            <Image
              height={10}
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
              height="10"
            />
          </a>
        </Flex>
        <Flex justify="end" mt={{ base: 2, md: 0}}>
          <Button
            bg="#2F2F2F80"
            color="white"
            variant="outline"
            rightIcon={<PiArrowUpBold />}
            fontWeight={500}
            _hover={{ bg: "#333333" }}
            onClick={scrollToAnchor}
          >
            Scroll to Top
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
