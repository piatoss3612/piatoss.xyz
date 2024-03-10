import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import Profile from "@/../public/profile.png";
import { FaGithubAlt } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";

export default function Home() {
  return (
    <Flex
      borderRadius="20px"
      p="20px"
      h="345px"
      w={{ base: "315px", md: "345px" }}
      alignItems="center"
      direction="column"
    >
      <Image
        src="https://i.ibb.co/xmP2pS6/Profile.png"
        maxW="100%"
        borderRadius="20px"
      />
      <Flex flexDirection="column" mb="30px">
        <Image
          src={Profile.src}
          border="5px solid white"
          mx="auto"
          width="68px"
          height="68px"
          mt="-38px"
          borderRadius="50%"
        />
        <Text fontWeight="600" textAlign="center" fontSize="xl">
          Hyohwak Lee
        </Text>
        <Text textAlign="center" fontSize="sm" fontWeight="500">
          Blockchain Developer
        </Text>
      </Flex>
      <Flex justify="space-between" w="100%" px="36px">
        <Flex flexDirection="column" justify="center" align="center">
          <a href="https://github.com/piatoss3612">
            <FaGithubAlt size="1.8rem" />
          </a>
        </Flex>
        <Flex flexDirection="column" justify="center" align="center">
          <Text fontWeight="600" fontSize="xl" textAlign="center">
            <a href="https://twitter.com/piatoss3612">
              <FaSquareXTwitter size="1.8rem" />
            </a>
          </Text>
        </Flex>
        <Flex flexDirection="column" justify="center" align="center">
          <Text fontWeight="600" fontSize="xl" textAlign="center">
            <a href="https://www.linkedin.com/in/hyohwak-lee/">
              <FaLinkedin size="1.8rem" />
            </a>
          </Text>
        </Flex>
        <Flex flexDirection="column" justify="center" align="center">
          <Text fontWeight="600" fontSize="xl" textAlign="center">
            <a href="mailto:piatoss3612@gmail.com">
              <FaEnvelope size="1.8rem" />
            </a>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
