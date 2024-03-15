import React from "react";
import { Box, Flex, Text, Stack, Button } from "@chakra-ui/react";
import WalletConnectButton from "./WalletConnectButton";
import { useAccount } from "wagmi";
import SupportBox from "./SupportBox";
import GuidePopover from "./GuidePopover";

export default function SupportCard({ flipCard }: { flipCard: () => void }) {
  const account = useAccount();

  return (
    <Flex
      p={5}
      w={["80%", "100%", "90%"]}
      alignItems="center"
      justifyContent="center"
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
        <Stack direction="row" justify={"space-between"}>
          <Text fontSize="xl" mt={1}>
            Thank you for supporting my dream!
          </Text>
          <GuidePopover />
        </Stack>
        <Stack mt={6} direction="column" spacing={4}>
          <WalletConnectButton />
          {account?.isConnected && <SupportBox />}
          <Button
            w="full"
            bgGradient="linear(to-r, pink.300, orange.400)"
            color="white"
            rounded="xl"
            boxShadow="md"
            _hover={{ bgGradient: "linear(to-r, pink.200, orange.300)" }}
            onClick={flipCard}
          >
            Back to Profile
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
