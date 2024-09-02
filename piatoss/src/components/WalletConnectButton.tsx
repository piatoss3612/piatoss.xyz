import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Button,
  Stack,
  Text,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

export default function WalletConnectButton() {
  const buttonBg = useColorModeValue("blue.500", "blue.600");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.700");
  const textColor = useColorModeValue("white", "gray.100");

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    w="full"
                    bg={buttonBg}
                    color={textColor}
                    rounded="xl"
                    boxShadow="md"
                    _hover={{
                      bg: buttonHoverBg,
                      transform: "translateY(-2px)",
                    }}
                    transition="all 0.2s"
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    w="full"
                    bg="red.500"
                    color={textColor}
                    rounded="xl"
                    boxShadow="md"
                    _hover={{ bg: "red.600", transform: "translateY(-2px)" }}
                    transition="all 0.2s"
                    onClick={openChainModal}
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={2}
                  w="full"
                >
                  <Button
                    flex={1}
                    bg={buttonBg}
                    color={textColor}
                    rounded="xl"
                    boxShadow="md"
                    _hover={{
                      bg: buttonHoverBg,
                      transform: "translateY(-2px)",
                    }}
                    transition="all 0.2s"
                    onClick={openChainModal}
                  >
                    <Flex align="center">
                      {chain.hasIcon && (
                        <Box
                          bg={chain.iconBackground}
                          w="24px"
                          h="24px"
                          rounded="full"
                          mr={2}
                          overflow="hidden"
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: "100%", height: "100%" }}
                            />
                          )}
                        </Box>
                      )}
                      <Text>{chain.name}</Text>
                    </Flex>
                  </Button>
                  <Button
                    flex={1}
                    bg={buttonBg}
                    color={textColor}
                    rounded="xl"
                    boxShadow="md"
                    _hover={{
                      bg: buttonHoverBg,
                      transform: "translateY(-2px)",
                    }}
                    transition="all 0.2s"
                    onClick={openAccountModal}
                  >
                    <Text isTruncated>
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </Text>
                  </Button>
                </Stack>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
