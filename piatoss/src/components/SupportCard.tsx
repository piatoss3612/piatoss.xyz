import React from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import WalletConnectButton from "./WalletConnectButton";
import { useAccount } from "wagmi";
import SupportBox from "./SupportBox";
import GuidePopover from "./GuidePopover";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function SupportCard({ flipCard }: { flipCard: () => void }) {
  const account = useAccount();
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(26, 32, 44, 0.9)"
  );
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Flex p={5} w="100%" alignItems="center" justifyContent="center" h="100%">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        bg={bgColor}
        backdropFilter="blur(10px)"
        w="full"
        maxW={{ base: "90%", md: "3xl" }}
        boxShadow="2xl"
        rounded="2xl"
        p={{ base: 6, md: 8 }}
        textAlign="center"
      >
        <Stack spacing={4}>
          <Flex justify="space-between" align="center" wrap="wrap" mb={4}>
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color={textColor}
              flex="1"
            >
              Thank you for supporting my dream!
            </Text>
            <Box>
              <GuidePopover />
            </Box>
          </Flex>

          <WalletConnectButton />
          {account?.isConnected && <SupportBox />}

          <Button
            w="full"
            bg="#4A5568"
            color="white"
            rounded="xl"
            boxShadow="md"
            _hover={{ bg: "#2D3748", transform: "translateY(-2px)" }}
            transition="all 0.2s"
            onClick={flipCard}
          >
            Back to Profile
          </Button>
        </Stack>
      </MotionBox>
    </Flex>
  );
}
