import React from "react";
import { Box, Flex, Text, Stack, Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function SupportCard({ flipCard }: { flipCard: () => void }) {
  return (
    <Flex
      p={5}
      w={["80%", "100%", "90%"]}
      alignItems="center"
      justifyContent="center"
      style={{ backfaceVisibility: "hidden", rotate: "180" }}
    >
      <Box
        bg="white"
        w="540px"
        maxW="xl"
        boxShadow="2xl"
        rounded="lg"
        p={6}
        textAlign="center"
      >
        <Text fontSize="xl">Thank you for your support!</Text>

        <Stack
          mt={8}
          direction="column"
          spacing={4}
          alignItems="center"
          justifyContent="center"
        >
          <ConnectButton />
        </Stack>
        <Stack mt={8} direction="column" spacing={4}>
          <Button
            w="full"
            bgGradient="linear(to-r, teal.400, blue.400)"
            color="white"
            rounded="xl"
            boxShadow="md"
            _hover={{ bgGradient: "linear(to-r, teal.300, blue.300)" }}
            onClick={flipCard}
          >
            Back to Profile
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
