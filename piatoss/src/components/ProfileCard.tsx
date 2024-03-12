import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Stack,
  Button,
  IconButton,
  Link,
} from "@chakra-ui/react";
import Profile from "@/../public/profile.png";

import {
  FaGithubAlt,
  FaSquareXTwitter,
  FaBloggerB,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa6";

export default function ProfileCard({ flipCard }: { flipCard: () => void }) {
  return (
    <Flex
      p={5}
      w={["100%", "90%", "80%"]}
      alignItems="center"
      justifyContent="center"
      h="100%"
    >
      <Box
        bg="white"
        w="full"
        maxW="xl"
        boxShadow="2xl"
        rounded="lg"
        p={6}
        textAlign="center"
      >
        <Image
          h={100}
          w={100}
          fit="cover"
          rounded="full"
          borderStyle="solid"
          src={Profile.src}
          alt="Profile Image"
          mx="auto"
          mb={4}
        />
        <Text fontWeight="bold" fontSize="x-large">
          Hyohwak Lee
        </Text>
        <Text fontWeight="bold" color="gray.500" mb={4}>
          Blockchain Engineer
        </Text>
        <Text fontWeight="bold" fontSize="xl" mb={4}>
          My Journey
        </Text>
        <Text textAlign="center" color="gray.700" px={3}>
          "Exploring the integration of blockchain in everyday life, I dream of
          crafting a better world through the power of blockchain."
        </Text>

        <Stack
          mt={8}
          direction="row"
          spacing={4}
          align="center"
          justifyContent="center"
        >
          <Link href="https://github.com/piatoss3612" isExternal>
            <IconButton
              aria-label="GitHub"
              variant="outline"
              colorScheme="black"
              size="lg"
              fontSize="24px"
              icon={<FaGithubAlt />}
              isRound={true}
            />
          </Link>
          <Link href="https://piatoss3612.tistory.com/" isExternal>
            <IconButton
              aria-label="Blog"
              variant="outline"
              colorScheme="orange"
              size="lg"
              fontSize="24px"
              icon={<FaBloggerB />}
              isRound={true}
            />
          </Link>
          <Link href="https://twitter.com/piatoss3612" isExternal>
            <IconButton
              aria-label="Twitter"
              variant="outline"
              colorScheme="black"
              size="lg"
              fontSize="24px"
              icon={<FaSquareXTwitter />}
              isRound={true}
            />
          </Link>
          <Link href="mailto:piatoss3612@mail.com">
            <IconButton
              aria-label="Email"
              variant="outline"
              colorScheme="blue"
              size="lg"
              fontSize="24px"
              icon={<FaEnvelope />}
              isRound={true}
            />
          </Link>
        </Stack>

        <Stack mt={8} direction="column" spacing={4}>
          <Button
            w="full"
            bgGradient="linear(to-r, teal.400, blue.400)"
            color="white"
            rounded="xl"
            boxShadow="md"
            _hover={{ bgGradient: "linear(to-r, teal.300, blue.300)" }}
          >
            Portfolio
          </Button>
          <Button
            w="full"
            bgGradient="linear(to-r, pink.400, red.400)"
            color="white"
            rounded="xl"
            boxShadow="md"
            _hover={{ bgGradient: "linear(to-r, pink.300, red.300)" }}
            leftIcon={<FaHeart />}
            onClick={flipCard}
          >
            Support
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
